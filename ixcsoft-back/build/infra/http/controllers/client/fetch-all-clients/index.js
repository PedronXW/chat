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

// src/infra/http/controllers/client/fetch-all-clients/index.ts
var fetch_all_clients_exports = {};
__export(fetch_all_clients_exports, {
  fetchAllClientsController: () => fetchAllClientsController
});
module.exports = __toCommonJS(fetch_all_clients_exports);

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

// src/domain/application/services/errors/ClientNonExists.ts
var ClientNonExistsError = class extends Error {
  constructor() {
    super(`Client non exists`);
  }
};

// src/domain/application/services/client/fetch-all-clients.ts
var FetchAllClientsService = class {
  constructor(clientRepository2) {
    this.clientRepository = clientRepository2;
  }
  async execute() {
    const client = await this.clientRepository.getAllClients();
    if (!client) {
      return left(new ClientNonExistsError());
    }
    return right(client);
  }
};

// src/infra/database/mongo-connection.ts
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

// src/infra/database/repositories/MongoClientRepository.ts
var MongoClientRepository = class {
  constructor(mongoConnection2) {
    this.mongoConnection = mongoConnection2;
  }
  async createClient(client) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    await collection.insertOne(ClientMapper.toPersistence(client));
    return client;
  }
  async deleteClient(id) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    const deleteResult = await collection.deleteOne({ id });
    return deleteResult.deletedCount === 1;
  }
  async editClient(id, { name, email }) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    const newClient = collection.updateOne(
      { id },
      {
        $set: {
          name,
          email
        }
      }
    );
    return ClientMapper.toDomain(newClient);
  }
  async getClientByEmail(email) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    const client = await collection.findOne({ email });
    if (!client) {
      return null;
    }
    return ClientMapper.toDomain(client);
  }
  async getClientById(id) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    const client = await collection.findOne({ id });
    if (!client) {
      return null;
    }
    return ClientMapper.toDomain(client);
  }
  async getAllClients() {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    const clients = await collection.find().toArray();
    return clients.map((client) => ClientMapper.toDomain(client));
  }
  async changeStatus(id, status) {
    const collection = this.mongoConnection.getCollection(
      "teste",
      env.NODE_ENV === "test" ? "teste_" + process.env.COLLECTION_ID : "clients"
    );
    await collection.updateOne(
      { id },
      {
        $set: {
          status
        }
      }
    );
    const client = await collection.findOne({ id });
    return ClientMapper.toDomain(client);
  }
};

// src/infra/services/client/fetch-all-clients/index.ts
var mongoConnection = new MongoConnection();
var clientRepository = new MongoClientRepository(mongoConnection);
var fetchAllClientsService = new FetchAllClientsService(clientRepository);

// src/infra/http/presenters/presenter-client.ts
var ClientPresenter = class {
  static toHTTP(client) {
    return {
      id: client.id.getValue(),
      name: client.name,
      email: client.email,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
};

// src/infra/http/controllers/client/fetch-all-clients/fetch-all-clients.ts
var FetchAllClientsController = class {
  constructor(fetchAllClientsService2) {
    this.fetchAllClientsService = fetchAllClientsService2;
  }
  async handle(req, res) {
    const clients = await this.fetchAllClientsService.execute();
    if (clients.isLeft()) {
      return res.status(404).send({ error: clients.value.message });
    }
    return res.status(200).send({ clients: clients.value.map(ClientPresenter.toHTTP) });
  }
};

// src/infra/http/controllers/client/fetch-all-clients/index.ts
var fetchAllClientsController = new FetchAllClientsController(
  fetchAllClientsService
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchAllClientsController
});
