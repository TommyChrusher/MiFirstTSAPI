"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const TiEsTeRouter_1 = __importDefault(require("./routes/TiEsTeRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello TypeScript");
});
app.use('/TiEsTe', TiEsTeRouter_1.default);
const serverPort = process.env.PORT;
app.listen(serverPort, () => {
    console.log("Server corriendo en el puerto 3000");
});
