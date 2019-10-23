export type PortType = {
  value: any;
  type: PortValueType;
  color: string;
  isEditable: boolean;
};

export enum PortValueType {
  default = 'default',
  number = 'number',
  timeseries = 'timeseries',
  trigger = 'trigger',
  JSON = 'JSON',
  boolean = 'boolean',
  string = 'string',
  any = 'any',
}

export const portTypeFactory = {
  createNumberPortType: () => Object.assign({}, numberPortType),
  createTriggerPortType: () => Object.assign({}, triggerPortType),
  createTimeSeriesPortType: () => Object.assign({}, timeSeriesPortType),
  createJSONPortType: () => Object.assign({}, jsonPortType),
  createBooleanPortType: () => Object.assign({}, booleanPortType),
  createStringPortType: () => Object.assign({}, stringPortType),
  createAnyPortType: () => Object.assign({}, anyPortType),
};

export const numberPortType: PortType = {
  value: 0,
  type: PortValueType.number,
  color: '#64d6c1',
  isEditable: true,
};

export const timeSeriesPortType: PortType = {
  value: [{ key: 0, value: 10 }, { key: 2, value: 20 }],
  type: PortValueType.timeseries,
  color: '#6b64d6',
  isEditable: false,
};

export const triggerPortType: PortType = {
  value: 0,
  type: PortValueType.trigger,
  color: '#888888',
  isEditable: false,
};

export const jsonPortType: PortType = {
  value: {},
  type: PortValueType.JSON,
  color: '#ababab',
  isEditable: false,
};

export const booleanPortType: PortType = {
  value: false,
  type: PortValueType.boolean,
  color: '#d6647b',
  isEditable: true,
};

export const stringPortType: PortType = {
  value: false,
  type: PortValueType.string,
  color: '#b7d664',
  isEditable: true,
};

export const anyPortType: PortType = {
  value: false,
  type: PortValueType.any,
  color: '#ffffff',
  isEditable: true,
};
