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

// src/domain/application/services/client/edit-client.ts
var edit_client_exports = {};
__export(edit_client_exports, {
  EditClientService: () => EditClientService
});
module.exports = __toCommonJS(edit_client_exports);

// src/@shared/either.ts
var Left = class {
  constructor(value) {
    this.value = value;
  }
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
};
var Right = class {
  constructor(value) {
    this.value = value;
  }
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
};
var left = (value) => {
  return new Left(value);
};
var right = (value) => {
  return new Right(value);
};

// src/domain/application/services/client/edit-client.ts
var EditClientService = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute(id, { name, email }) {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      return left(new Error("Client not found"));
    }
    const updatedClient = await this.clientRepository.editClient(id, {
      ...client,
      name,
      email
    });
    return right(updatedClient);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditClientService
});
