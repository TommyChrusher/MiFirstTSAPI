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
const dbConfig_1 = require("../config/dbConfig");
const validations_1 = __importDefault(require("./validations/validations"));
const customClasses_1 = __importDefault(require("../config/customClasses"));
const dbFunctions_1 = __importDefault(require("../config/dbFunctions"));
//////Parametrización de distintas acciones a realizar en la tabla 'tiposestilostecnicas'
const tableName = "tiposestilostecnicas";
////Crear nuevo registro
/*
const createTiEsTe = async (params: any) => {
    try {
        const data = params
        validations.checkInsertData(data)
        await POOL.query(`
            Insert Into ${tableName}(
            tipodato,
            nombredato,
            descripciondato) Values (
            '${data.tipodato}',
            '${data.nombredato}',
            '${data.descripciondato}'
            )`)
        const result = await POOL.query(`
            Select * From ${tableName}
            Where tipodato = '${data.tipodato}' AND
            nombredato = '${data.nombredato}' AND
            descripciondato = '${data.descripciondato}'
            `)
        return result.rows
    } catch (error) {
        throw new Error(String(error));
    }
}*/
const createTiEsTe = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbFunctions_1.default.creatItem(tableName, params);
        return result;
    }
    catch (error) {
        throw new customClasses_1.default.CustomError(error.message, error.statusCode);
    }
});
////Enlistar todos los registros
const getAllTiEsTe = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.POOL.query(`Select * From ${tableName}`);
        return result.rows;
    }
    catch (error) {
        throw new Error(String(error));
    }
});
////Obtener TIEsTe por ID
const getTiEsTe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID = validations_1.default.checkType(id, "number");
        const result = yield validations_1.default.findItem(tableName, ID);
        if (result.length === 0) {
            throw new customClasses_1.default.CustomError("No se encontraron registros", 404);
        }
        else {
            return result;
        }
    }
    catch (error) {
        throw new customClasses_1.default.CustomError(error.message, error.statusCode);
    }
});
////Editar TiEsTe
/*
const editTiEsTe = async (id:any,params:any)=>{
    try{
        const Id = validations.checkType(id,"number");
        const data = params
        validations.checkInsertData(data)
        await validations.findItem(tableName,Id)
        const changes = Object.entries(data)
            .map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
            .join(", ");
        await POOL.query(`Update ${tableName} SET ${changes} Where id = ${Id}`)
        const result = await POOL.query(`
            Select * From ${tableName}
            Where id = ${Id}
            `)
        return result.rows
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}*/
exports.default = {
    createTiEsTe,
    getAllTiEsTe,
    getTiEsTe
};
