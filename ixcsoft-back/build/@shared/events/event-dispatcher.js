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

// src/@shared/events/event-dispatcher.ts
var event_dispatcher_exports = {};
__export(event_dispatcher_exports, {
  EventDispatcher: () => EventDispatcher
});
module.exports = __toCommonJS(event_dispatcher_exports);
var EventDispatcher = class {
  static register(event, listener) {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, []);
    }
    this.listenersMap.get(event).push(listener);
  }
  static unregister(event, listener) {
    if (!this.listenersMap.has(event)) {
      return;
    }
    const listeners = this.listenersMap.get(event);
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
  static unregisterAll() {
    this.listenersMap = /* @__PURE__ */ new Map();
  }
  static dispatch(event, data) {
    if (!this.listenersMap.has(event)) {
      return;
    }
    this.listenersMap.get(event).forEach((listener) => {
      listener(data);
    });
  }
};
EventDispatcher.listenersMap = /* @__PURE__ */ new Map();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventDispatcher
});
