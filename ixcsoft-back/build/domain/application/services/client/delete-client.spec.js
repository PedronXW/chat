"use strict";

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

// test/factories/client-factory.ts
function makeClient(override = {}, id) {
  const client = Client.create(
    {
      name: "any_name",
      email: "any_email",
      password: "any_password",
      status: "offline",
      createdAt: /* @__PURE__ */ new Date(),
      ...override
    },
    id
  );
  return client;
}

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

// test/repositories/InMemoryClientRepository.ts
var InMemoryClientRepository = class {
  constructor() {
    this.clients = [];
  }
  async createClient(client) {
    this.clients.push(ClientMapper.toPersistence(client));
    return client;
  }
  async getClientByEmail(email) {
    const client = this.clients.find((c) => c.email === email);
    if (!client)
      return null;
    return ClientMapper.toDomain(client);
  }
  async getClientById(id) {
    const client = this.clients.find((c) => c.id === id);
    if (!client)
      return null;
    return ClientMapper.toDomain(client);
  }
  async deleteClient(id) {
    const clientIndex = this.clients.findIndex((c) => c.id === id);
    this.clients.splice(clientIndex, 1);
    return true;
  }
  async editClient(id, { name, email }) {
    const clientIndex = this.clients.findIndex((c) => c.id === id);
    this.clients[clientIndex] = {
      ...this.clients[clientIndex],
      name,
      email,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return ClientMapper.toDomain(this.clients[clientIndex]);
  }
  async getAllClients() {
    return this.clients.map((c) => ClientMapper.toDomain(c));
  }
  async changeStatus(id, status) {
    const clientIndex = this.clients.findIndex((c) => c.id === id);
    this.clients[clientIndex] = {
      ...this.clients[clientIndex],
      status,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return ClientMapper.toDomain(this.clients[clientIndex]);
  }
};

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

// src/domain/application/services/client/delete-client.ts
var DeleteClientService = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    id
  }) {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      return left(new ClientNonExistsError());
    }
    const result = await this.clientRepository.deleteClient(id);
    return right(result);
  }
};

// src/domain/application/services/client/delete-client.spec.ts
var sut;
var inMemoryClientRepository;
describe("DeleteClient", () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new DeleteClientService(inMemoryClientRepository);
  });
  it("should be able to delete a client", async () => {
    const client = makeClient({
      name: "any_name",
      email: "any_email@gmail.com"
    });
    await inMemoryClientRepository.createClient(client);
    const result = await sut.execute({ id: client.id.getValue() });
    expect(result.isRight()).toBe(true);
    expect(inMemoryClientRepository.clients).toHaveLength(0);
  });
});
