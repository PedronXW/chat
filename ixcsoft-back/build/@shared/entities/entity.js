"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/@shared/entities/entity.ts
var entity_exports = {};
__export(entity_exports, {
  Entity: () => Entity
});
module.exports = __toCommonJS(entity_exports);

// src/@shared/entities/entity-id.ts
var import_crypto = require("crypto");
var EntityId = class {
  constructor(value) {
    this.value = value ?? (0, import_crypto.randomUUID)();
  }
  getValue() {
    return this.value;
  }
  equals(id) {
    if (id === null || id === void 0) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    if (id === this) {
      return true;
    }
    return this.getValue() === id.value;
  }
};

// src/@shared/entities/entity.ts
var Entity = class {
  get id() {
    return this._id;
  }
  constructor(props, id) {
    this._id = id ?? new EntityId();
    this.props = props;
  }
  equals(entity) {
    if (entity === null || entity === void 0) {
      return false;
    }
    if (!(entity instanceof this.constructor)) {
      return false;
    }
    if (entity === this) {
      return true;
    }
    return this._id.equals(entity._id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Entity
});
