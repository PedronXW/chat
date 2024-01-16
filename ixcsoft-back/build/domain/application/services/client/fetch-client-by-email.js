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

// src/domain/application/services/client/fetch-client-by-email.ts
var fetch_client_by_email_exports = {};
__export(fetch_client_by_email_exports, {
  FetchClientByEmailService: () => FetchClientByEmailService
});
module.exports = __toCommonJS(fetch_client_by_email_exports);

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

// src/domain/application/services/errors/ClientNonExists.ts
var ClientNonExistsError = class extends Error {
  constructor() {
    super(`Client non exists`);
  }
};

// src/domain/application/services/client/fetch-client-by-email.ts
var FetchClientByEmailService = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    email
  }) {
    const client = await this.clientRepository.getClientByEmail(email);
    if (!client) {
      return left(new ClientNonExistsError());
    }
    return right(client);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchClientByEmailService
});
