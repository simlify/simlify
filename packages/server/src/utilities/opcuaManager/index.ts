import { OPCUAServer, Variant, UAObject, UAVariable, Namespace, AddressSpace } from 'node-opcua';

type OPCUADevice = {
  variables: { [variableName: string]: UAVariable };
  UAObject: UAObject;
};

type OPCUAServerInformation = {
  server: OPCUAServer;
  isStarted: boolean;
  devices: { [deviceName: string]: OPCUADevice };
};

const opcuaServers: { [portPath: string]: OPCUAServerInformation } = {};

const getAddressSpace = (port: number, resourcePath: string): Promise<AddressSpace> => {
  return new Promise((resolve, reject) => {
    const portPath = port + resourcePath;
    const serverInformation = opcuaServers[portPath];
    if (serverInformation.server.engine.addressSpace) {
      resolve(serverInformation.server.engine.addressSpace);
    } else {
      serverInformation.server.initialize(() => {
        resolve(serverInformation.server.engine.addressSpace);
      });
    }
  });
};

const createServer = (port: number, resourcePath: string) => {
  return new Promise((resolve, reject) => {
    const portPath = port + resourcePath;

    opcuaServers[portPath] = {
      server: null,
      isStarted: false,
      devices: {},
    };

    opcuaServers[portPath].server = new OPCUAServer({
      port,
      resourcePath,
    });

    opcuaServers[portPath].server.initialize(() => resolve());
  });
};

const startServer = (port: number, resourcePath: string) => {
  const portPath = port + resourcePath;

  if (opcuaServers[portPath].isStarted) return;

  opcuaServers[portPath].server.start(() => {
    console.log('started OPCUA server');
    opcuaServers[portPath].isStarted = true;
  });
};

const stopServer = (port: number, resourcePath: string) => {
  const portPath = port + resourcePath;
  opcuaServers[portPath].server.shutdown();
};

const deleteServer = (port: number, resourcePath: string) => {
  const portPath = port + resourcePath;

  opcuaServers[portPath].server.shutdown((err) => {
    if (err) console.log(err);
    else console.log('Shut down the opcua server');
  });
  delete opcuaServers[portPath];
};

const isServerAvailable = (port: number, resourcePath: string) => {
  const portPath = port + resourcePath;
  const serverInformation = opcuaServers[portPath];
  return !!serverInformation;
};

const getDevice = (
  port: number,
  resourcePath: string,
  deviceName: string
): OPCUADevice => {
  const portPath = port + resourcePath;
  const serverInformation = opcuaServers[portPath];
  return serverInformation.devices[deviceName];
};

const createDevice = (
  addressSpace: AddressSpace,
  serverInformation: OPCUAServerInformation,
  deviceName: string
): OPCUADevice => {

  const namespace = addressSpace.getOwnNamespace();
  const uaObject = namespace.addObject({
    organizedBy: addressSpace.rootFolder.objects,
    browseName: deviceName,
  });

  const device = {
    UAObject: uaObject,
    variables: {},
  };

  serverInformation.devices[deviceName] = device;
  return device;
};

const deleteDevice = (
  addressSpace: AddressSpace,
  serverInformation: OPCUAServerInformation,
  deviceName: string
) => {
  const namespace = addressSpace.getOwnNamespace();
  namespace.deleteNode(serverInformation.devices[deviceName].UAObject);
  delete serverInformation.devices[deviceName];
};

const getVariable = (device: OPCUADevice, variableName: string): UAVariable => {
  return device.variables[variableName];
};

const deleteVariable = (
  port: number,
  resourcePath: string,
  deviceName: string,
  variableName: string,
) => {
  const portPath = port + resourcePath;
  const serverInformation = opcuaServers[portPath];
  const addressSpace = serverInformation.server.engine.addressSpace;
  if (!addressSpace) return;
  const namespace = addressSpace.getOwnNamespace();
  const device = getDevice(port, resourcePath, deviceName);
  const variable = device.variables[variableName];
  delete device.variables[variableName];
  namespace.deleteNode(variable);
};

const createVariable = (
  addressSpace: AddressSpace,
  device: OPCUADevice,
  variableName: string,
  callback: () => Variant,
) => {

  const namespace = addressSpace.getOwnNamespace();
  device.variables[variableName] = namespace.addVariable({
    componentOf: device.UAObject,
    browseName: variableName,
    dataType: 'Double',
    value: {
      get: callback,
    }
  });
};

const registerValue = async (
  port: number,
  resourcePath: string,
  deviceName: string,
  variableName: string,
  callback: () => Variant,
) => {
  if (!isServerAvailable(port, resourcePath)) await createServer(port, resourcePath);
  // stopServer(port, resourcePath);

  const addressSpace = await getAddressSpace(port, resourcePath);
  const portPath = port + resourcePath;
  const serverInformation = opcuaServers[portPath];

  let device = getDevice(port, resourcePath, deviceName);
  if (!device) device = createDevice(addressSpace, serverInformation, deviceName);

  const existingVariable = getVariable(device, variableName);
  if (existingVariable) {
    deleteVariable(port, resourcePath, deviceName, variableName);
  }
  createVariable(addressSpace, device, variableName, callback);
  startServer(port, resourcePath);
};

const deregisterValue = async (
  port: number,
  resourcePath: string,
  deviceName: string,
  variableName: string
) => {
  const portPath = port + resourcePath;
  const opcuaServer = opcuaServers[portPath];
  const addressSpace = await getAddressSpace(port, resourcePath);

  if (!opcuaServer) return;
  const device = getDevice(port, resourcePath, deviceName);
  deleteVariable(port, resourcePath, deviceName, variableName);
  if (Object.values(device.variables).length === 0) {
    deleteDevice(addressSpace, opcuaServer, deviceName);
  }
  if (Object.values(opcuaServer.devices).length === 0) {
    // deleteServer(port, resourcePath);
  }
};

const opcuaManager = {
  registerValue,
  deregisterValue,
};

export default opcuaManager;
