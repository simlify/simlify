import fs from 'fs';
import path from 'path';
import { CommonData } from '../../core';
import Flow from '../../flow/lib/Flow';
import { NodeBase } from '../nodeBase';

let commonData: CommonData = null;
let nodeRegistry: any = {};

export const init = (_commonData: CommonData) => {
  commonData = _commonData;
};

export const clear = () => { nodeRegistry = {}; };

export const createNode = (parentFlow: Flow, nodeName: string, nodeId: string): NodeBase => {
  return new nodeRegistry[nodeName](parentFlow, nodeId);
};

export const registry = (): any => { return nodeRegistry; };

  /*
  * This function is needed to send the available Nodes to the client.
  * A deserialize function is not needed as the client will not to create a new nodeRegistry.
  **/
export const serialize = () : any => {
  const serializedRegistry: any = {};
  Object.entries(nodeRegistry).forEach(([nodeName, node]: [string, { new(): NodeBase }]) => {
    const nodeInstance = new node();
    const nodeSerialized = nodeInstance.serialize();
    serializedRegistry[nodeName] = nodeSerialized;
  });
  return serializedRegistry;
};

export const registerNode = (nodeName: string, nodeClass: { new(): NodeBase }) => {
  nodeRegistry[nodeName] = nodeClass;
};

export const registerNodesFromFolder = (folderPath: string) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) return reject(err);

      files.forEach((fileName) => {
        if (fileName.slice(-2) === 'js') {
          const pathToFile = path.join(folderPath, fileName);
          const node = require(pathToFile);
          registerNode(node.default.getNodeName(), node.default);
        }
      });

      resolve();
    });
  });
};

export const unregisterNode = (nodeName: string) => { delete nodeRegistry[nodeName]; };
