"use strict";

// src/@shared/either.ts
var Left = class {
  constructor(value) {
    this.value = value;
  }
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
};
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
var left = (value) => {
  return new Left(value);
};
var right = (value) => {
  return new Right(value);
};

// src/@shared/either.spec.ts
function doSomething(shouldSuccess) {
  if (shouldSuccess) {
    return right("success");
  } else {
    return left("error");
  }
}
test("success result", () => {
  const successResult = doSomething(true);
  expect(successResult.isRight()).toEqual(true);
});
test("error result", () => {
  const errorResult = doSomething(false);
  expect(errorResult.isLeft()).toEqual(true);
});
