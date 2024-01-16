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

// src/infra/http/controllers/message/get-messages/get-messages.ts
var get_messages_exports = {};
__export(get_messages_exports, {
  GetMessagesController: () => GetMessagesController
});
module.exports = __toCommonJS(get_messages_exports);

// src/infra/http/presenters/presenter-message.ts
var MessagePresenter = class {
  static toHTTP(message) {
    return {
      id: message.id.getValue(),
      text: message.text,
      creatorName: message.creatorName,
      creatorId: message.creatorId.getValue(),
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };
  }
};

// src/infra/http/controllers/message/get-messages/get-messages.ts
var import_zod = require("zod");
var getMessagesQueryZodSchema = import_zod.z.object({
  page: import_zod.z.string().optional().default("0"),
  limit: import_zod.z.string().optional().default("10")
});
var GetMessagesController = class {
  constructor(fetchMessagesByChatService) {
    this.fetchMessagesByChatService = fetchMessagesByChatService;
  }
  async handle(req, res) {
    const { page, limit } = getMessagesQueryZodSchema.parse(req.query);
    const messages = await this.fetchMessagesByChatService.execute({
      query: {
        page: Number(page),
        limit: Number(limit)
      }
    });
    if (messages.isLeft()) {
      return res.status(404).send({ error: messages.value.message });
    }
    return res.status(200).send({
      messages: messages.value.messages.map(MessagePresenter.toHTTP),
      count: messages.value.count
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetMessagesController
});
