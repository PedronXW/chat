"use strict";

// src/@shared/entities/watched-list.ts
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

// src/@shared/entities/watched-list.spec.ts
var NumberWatchedList = class extends WatchedList {
  compareItems(a, b) {
    return a === b;
  }
};
describe("WatchedList", () => {
  it("should be able to create a watched list with initial items", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    expect(list.getItems()).toHaveLength(3);
  });
  it("should be able to add new items to the list", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.add(4);
    expect(list.getItems()).toHaveLength(4);
    expect(list.getNewItems()).toHaveLength(1);
  });
  it("should be able to remove items to the list", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.remove(3);
    expect(list.getItems()).toHaveLength(2);
    expect(list.getRemovedItems()).toHaveLength(1);
  });
  it("should be able to add an item even if it was removed before", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.remove(3);
    list.add(3);
    expect(list.getItems()).toHaveLength(3);
    expect(list.getRemovedItems()).toHaveLength(0);
  });
  it("should be able to remove an item even if it was added before", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.add(4);
    list.remove(4);
    expect(list.getItems()).toHaveLength(3);
    expect(list.getRemovedItems()).toHaveLength(0);
  });
  it("should be able to update watched list items", () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.update([1, 2, 5]);
    expect(list.getItems()).toHaveLength(3);
    expect(list.getRemovedItems()).toHaveLength(1);
  });
});
