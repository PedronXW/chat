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

// src/infra/http/presenters/presenter-message.ts
var presenter_message_exports = {};
__export(presenter_message_exports, {
  MessagePresenter: () => MessagePresenter
});
module.exports = __toCommonJS(presenter_message_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessagePresenter
});
