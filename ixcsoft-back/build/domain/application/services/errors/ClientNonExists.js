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

// src/domain/application/services/errors/ClientNonExists.ts
var ClientNonExists_exports = {};
__export(ClientNonExists_exports, {
  ClientNonExistsError: () => ClientNonExistsError
});
module.exports = __toCommonJS(ClientNonExists_exports);
var ClientNonExistsError = class extends Error {
  constructor() {
    super(`Client non exists`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClientNonExistsError
});
