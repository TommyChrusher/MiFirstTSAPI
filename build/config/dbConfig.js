"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.POOL = new pg_1.default.Pool({
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    ssl: { rejectUnauthorized: false }
});
exports.POOL.connect()
    .then(() => console.log("Conexión exitosa"))
    .catch(error => console.log("Error conectando", error));
