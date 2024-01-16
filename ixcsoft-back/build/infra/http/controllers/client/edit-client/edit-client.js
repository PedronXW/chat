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

// src/infra/http/controllers/client/edit-client/edit-client.ts
var edit_client_exports = {};
__export(edit_client_exports, {
  EditClientController: () => EditClientController
});
module.exports = __toCommonJS(edit_client_exports);
var import_zod = require("zod");
var editClientZodBodySchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email()
});
var editClientZodParamsSchema = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
var EditClientController = class {
  constructor(editClientService) {
    this.editClientService = editClientService;
  }
  async handle(req, res) {
    const { id } = editClientZodParamsSchema.parse(req.user);
    const { name, email } = editClientZodBodySchema.parse(req.body);
    const editedClient = await this.editClientService.execute(id, {
      name,
      email
    });
    if (editedClient.isLeft()) {
      return res.status(404).send({ error: editedClient.value.message });
    }
    return res.status(201).send({ client: editedClient.value });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditClientController
});
