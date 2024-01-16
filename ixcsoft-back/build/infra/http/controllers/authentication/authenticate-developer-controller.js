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

// src/infra/http/controllers/authentication/authenticate-developer-controller.ts
var authenticate_developer_controller_exports = {};
__export(authenticate_developer_controller_exports, {
  AuthenticateClientController: () => AuthenticateClientController
});
module.exports = __toCommonJS(authenticate_developer_controller_exports);
var import_zod = require("zod");
var authenticateClientZodSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(8)
});
var AuthenticateClientController = class {
  constructor(authenticateClientService) {
    this.authenticateClientService = authenticateClientService;
  }
  async handle(req, res) {
    const { email, password } = authenticateClientZodSchema.parse(req.body);
    const token = await this.authenticateClientService.execute({
      email,
      password
    });
    if (token.isLeft()) {
      return res.status(401).send({ error: token.value.message });
    }
    return res.status(200).send({ token: token.value.token });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateClientController
});
