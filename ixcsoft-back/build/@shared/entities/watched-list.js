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

// src/@shared/entities/watched-list.ts
var watched_list_exports = {};
__export(watched_list_exports, {
  WatchedList: () => WatchedList
});
module.exports = __toCommonJS(watched_list_exports);
var WatchedList = class {
  constructor(initialItems) {
    this.currentItems = initialItems || [];
    this.initial = initialItems || [];
    this.new = [];
    this.removed = [];
  }
  getItems() {
    return this.currentItems;
  }
  getNewItems() {
    return this.new;
  }
  getRemovedItems() {
    return this.removed;
  }
  isCurrentItem(item) {
    return this.currentItems.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  isNewItem(item) {
    return this.new.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  isRemovedItem(item) {
    return this.removed.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  removeFromNew(item) {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }
  removeFromCurrent(item) {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v)
    );
  }
  removeFromRemoved(item) {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v));
  }
  wasAddedInitially(item) {
    return this.initial.filter((v) => this.compareItems(item, v)).length !== 0;
  }
  exists(item) {
    return this.isCurrentItem(item);
  }
  add(item) {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }
    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }
    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }
  remove(item) {
    this.removeFromCurrent(item);
    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }
    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }
  update(items) {
    const newItems = items.filter((a) => {
      return !this.getItems().some((b) => this.compareItems(a, b));
    });
    const removedItems = this.getItems().filter((a) => {
      return !items.some((b) => this.compareItems(a, b));
    });
    this.currentItems = items;
    this.new = newItems;
    this.removed = removedItems;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WatchedList
});
