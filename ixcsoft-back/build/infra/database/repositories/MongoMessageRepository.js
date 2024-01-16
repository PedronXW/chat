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

// src/infra/database/repositories/MongoMessageRepository.ts
var MongoMessageRepository_exports = {};
__export(MongoMessageRepository_exports, {
  MongoMessageRepository: () => MongoMessageRepository
});
module.exports = __toCommonJS(MongoMessageRepository_exports);

// src/infra/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");

// src/infra/http/errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/infra/env/index.ts
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3333),
  MONGO_URL_PRODUCTION: import_zod.z.string().url(),
  MONGO_URL_DEVELOPMENT: import_zod.z.string().url(),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  throw new AppError(_env.error.message);
}
var env = _env.data;

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

// src/domain/enterprise/entities/message.ts
var Message = class _Message extends Entity {
  get creatorId() {
    return this.props.creatorId;
  }
  get creatorName() {
    return this.props.creatorName;
  }
  get text() {
    return this.props.text;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  static create(props, id) {
    const message = new _Message(
      {
        ...props,
        createdAt: props.createdAt ?? /* @__PURE__ */ new Date()
      },
      id
    );
    return message;
  }
};

// src/infra/database/mappers/message-mapper.ts
var MessageMapper = class {
  static toPersistence(message) {
    return {
      id: message.id.getValue(),
      text: message.text,
      creatorId: message.creatorId.getValue(),
      creatorName: message.creatorName,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };
  }
  static toDomain(message) {
    const newMessage = Message.create(
      {
        text: message.text,
        creatorId: new EntityId(message.creatorId),
        creatorName: message.creatorName,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt
      },
      new EntityId(message.id)
    );
    return newMessage;
  }
};

// src/infra/database/repositories/MongoMessageRepository.ts
var MongoMessageRepository = class {
  constructor(mongoConnection) {
    this.mongoConnection = mongoConnection;
  }
  async createMessage(message) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "messages"
    );
    await collection.insertOne(MessageMapper.toPersistence(message));
    return message;
  }
  async getMessages({ page, limit }) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "messages"
    );
    const options = {
      limit,
      skip: limit * page,
      sort: ["createdAt", "desc"]
    };
    const count = await collection.countDocuments();
    const messages = (await collection.find({}, options).toArray()).map(
      MessageMapper.toDomain
    );
    return {
      messages,
      count
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MongoMessageRepository
});
