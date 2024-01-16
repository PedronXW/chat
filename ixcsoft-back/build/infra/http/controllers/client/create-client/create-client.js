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

// src/infra/http/controllers/client/create-client/create-client.ts
var create_client_exports = {};
__export(create_client_exports, {
  CreateClientController: () => CreateClientController
});
module.exports = __toCommonJS(create_client_exports);

// src/infra/http/presenters/presenter-client.ts
var ClientPresenter = class {
  static toHTTP(client) {
    return {
      id: client.id.getValue(),
      name: client.name,
      email: client.email,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
};

// src/infra/http/controllers/client/create-client/create-client.ts
var import_zod = require("zod");
var createClientZodSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email(),
  password: import_zod.z.string()
});
var CreateClientController = class {
  constructor(createClientService) {
    this.createClientService = createClientService;
  }
  async handle(req, res) {
    const { name, email, password } = createClientZodSchema.parse(req.body);
    const client = await this.createClientService.execute({
      name,
      email,
      password
    });
    if (client.isLeft()) {
      return res.status(401).json({ error: client.value.message });
    }
    return res.status(201).json(ClientPresenter.toHTTP(client.value));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateClientController
});
