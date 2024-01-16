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

// src/infra/http/controllers/client/delete-client/delete-client.ts
var delete_client_exports = {};
__export(delete_client_exports, {
  DeleteClientController: () => DeleteClientController
});
module.exports = __toCommonJS(delete_client_exports);
var import_zod = require("zod");
var deleteClientZodSchema = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
var DeleteClientController = class {
  constructor(deleteClientService) {
    this.deleteClientService = deleteClientService;
  }
  async handle(req, res) {
    const { id } = deleteClientZodSchema.parse(req.user);
    const client = await this.deleteClientService.execute({ id });
    if (client.isLeft()) {
      return res.status(401).json({ error: client.value.message });
    }
    return res.status(204).json();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteClientController
});
