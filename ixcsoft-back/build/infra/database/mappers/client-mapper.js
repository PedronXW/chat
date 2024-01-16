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

// src/infra/database/mappers/client-mapper.ts
var client_mapper_exports = {};
__export(client_mapper_exports, {
  ClientMapper: () => ClientMapper
});
module.exports = __toCommonJS(client_mapper_exports);

// src/@shared/entities/entity-id.ts
var import_crypto = require("crypto");
var EntityId = class {
  constructor(value) {
    this.value = value ?? (0, import_crypto.randomUUID)();
  }
  getValue() {
    return this.value;
  }
  equals(id) {
    if (id === null || id === void 0) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    if (id === this) {
      return true;
    }
    return this.getValue() === id.value;
  }
};

// src/@shared/entities/entity.ts
var Entity = class {
  get id() {
    return this._id;
  }
  constructor(props, id) {
    this._id = id ?? new EntityId();
    this.props = props;
  }
  equals(entity) {
    if (entity === null || entity === void 0) {
      return false;
    }
    if (!(entity instanceof this.constructor)) {
      return false;
    }
    if (entity === this) {
      return true;
    }
    return this._id.equals(entity._id);
  }
};

// src/domain/enterprise/entities/client.ts
var Client = class _Client extends Entity {
  get name() {
    return this.props.name;
  }
  set name(name) {
    this.props.name = name;
  }
  get status() {
    return this.props.status;
  }
  set status(status) {
    this.props.status = status;
  }
  get email() {
    return this.props.email;
  }
  set email(email) {
    this.props.email = email;
  }
  get password() {
    return this.props.password;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  static create(props, id) {
    const client = new _Client(
      {
        ...props,
        status: props.status ?? "offline",
        createdAt: props.createdAt ?? /* @__PURE__ */ new Date()
      },
      id
    );
    return client;
  }
};

// src/infra/database/mappers/client-mapper.ts
var ClientMapper = class {
  static toDomain(raw) {
    return Client.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new EntityId(raw.id)
    );
  }
  static toPersistence(Client2) {
    return {
      id: Client2.id.getValue(),
      name: Client2.name,
      email: Client2.email,
      status: Client2.status,
      password: Client2.password,
      createdAt: Client2.createdAt,
      updatedAt: Client2.updatedAt
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClientMapper
});
