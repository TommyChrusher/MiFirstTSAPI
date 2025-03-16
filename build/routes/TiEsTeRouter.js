"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TiEsTeController_1 = __importDefault(require("../controller/TiEsTeController"));
const TiEsTeRouter = (0, express_1.Router)();
TiEsTeRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield TiEsTeController_1.default.createTiEsTe(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
TiEsTeRouter.get('/all', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield TiEsTeController_1.default.getAllTiEsTe();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
TiEsTeRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield TiEsTeController_1.default.getTiEsTe(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
}));
TiEsTeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = yield TiEsTeController_1.default.editTiEsTe(id, body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json({ error: error.message });
    }
}));
exports.default = TiEsTeRouter;
