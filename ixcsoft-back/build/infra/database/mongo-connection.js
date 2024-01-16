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

// src/infra/database/mongo-connection.ts
var mongo_connection_exports = {};
__export(mongo_connection_exports, {
  MongoConnection: () => MongoConnection
});
module.exports = __toCommonJS(mongo_connection_exports);
var import_mongodb = require("mongodb");

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

// src/infra/database/mongo-connection.ts
var MongoConnection = class {
  constructor() {
    this.client = new import_mongodb.MongoClient(
      env.NODE_ENV === "production" ? env.MONGO_URL_PRODUCTION : env.MONGO_URL_DEVELOPMENT
    );
    this.connect();
  }
  async connect() {
    await this.client.connect();
  }
  async disconnect() {
    await this.client.close();
  }
  async createCollection(dbName, collectionName) {
    const database = this.client.db(dbName);
    const newCollection = await database.createCollection(collectionName);
    return newCollection;
  }
  async getDatabase(dbName) {
    const database = this.client.db(dbName);
    return database;
  }
  getCollection(dbName, collectionName) {
    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);
    return collection;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MongoConnection
});
