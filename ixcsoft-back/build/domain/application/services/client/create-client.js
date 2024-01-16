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

// src/domain/application/services/client/create-client.ts
var create_client_exports = {};
__export(create_client_exports, {
  CreateClientService: () => CreateClientService
});
module.exports = __toCommonJS(create_client_exports);

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

// src/domain/application/services/errors/ClientAlreadyExistsError.ts
var ClientAlreadyExistsError = class extends Error {
  constructor() {
    super(`Client already exists`);
  }
};

// src/domain/application/services/client/create-client.ts
var CreateClientService = class {
  constructor(clientRepository, hashGenerator) {
    this.clientRepository = clientRepository;
    this.hashGenerator = hashGenerator;
  }
  async execute({
    name,
    email,
    password
  }) {
    const clientExists = await this.clientRepository.getClientByEmail(email);
    if (clientExists) {
      return left(new ClientAlreadyExistsError());
    }
    const hashedPassword = await this.hashGenerator.hash(password);
    const client = Client.create({
      name,
      email,
      password: hashedPassword
    });
    const newClient = await this.clientRepository.createClient(client);
    return right(newClient);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateClientService
});
