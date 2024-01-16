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

// src/infra/cryptography/encrypter.ts
var encrypter_exports = {};
__export(encrypter_exports, {
  JwtEncrypter: () => JwtEncrypter
});
module.exports = __toCommonJS(encrypter_exports);
var import_jsonwebtoken = require("jsonwebtoken");

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

// src/infra/cryptography/encrypter.ts
var JwtEncrypter = class {
  async encrypt(payload) {
    return (0, import_jsonwebtoken.sign)({}, env.JWT_SECRET, {
      subject: payload.id,
      expiresIn: "1d"
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JwtEncrypter
});
