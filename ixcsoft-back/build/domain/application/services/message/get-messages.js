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

// src/domain/application/services/message/get-messages.ts
var get_messages_exports = {};
__export(get_messages_exports, {
  GetMessagesService: () => GetMessagesService
});
module.exports = __toCommonJS(get_messages_exports);

// src/@shared/either.ts
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
var right = (value) => {
  return new Right(value);
};

// src/domain/application/services/message/get-messages.ts
var GetMessagesService = class {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }
  async execute({
    query
  }) {
    const message = await this.messageRepository.getMessages(query);
    return right(message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetMessagesService
});
