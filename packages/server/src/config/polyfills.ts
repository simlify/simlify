declare interface Object {
  renameProperty(oldName: string, newName: string): any;
}

Object.prototype.renameProperty = function (oldName: string, newName: string): any {
  if (oldName === newName) {
    return this;
  }
  if (this.hasOwnProperty(oldName)) {
    this[newName] = this[oldName];
    delete this[oldName];
  }
  return this;
};
