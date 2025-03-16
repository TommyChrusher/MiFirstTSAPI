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
const customClasses_1 = __importDefault(require("./customClasses"));
const validations_1 = __importDefault(require("../controller/validations/validations"));
/////nombre de la tabla tieste
const tableNameTiEsTe = "tiposestilostecnicas";
/////Buscar elemento de tabla por ID
function findItem(tableName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = JSON.parse(JSON.stringify((yield dbConfig_1.POOL.query(`Select * from ${tableName} 
        Where id = ${id}`))));
            if (result.rows.length === 0) {
                throw new customClasses_1.default.CustomError(`No se encontró el elemento con id ${id}`, 404);
            }
            else {
                return result.rows;
            }
        }
        catch (error) {
            throw new customClasses_1.default.CustomError(error.message, error.statusCode);
        }
    });
}
/////Enlistar todos los elementos de la tabla
function listItems(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbResponse = yield dbConfig_1.POOL.query(`Select * from ${tableName}`);
            const result = JSON.parse(JSON.stringify(dbResponse));
            return result;
        }
        catch (error) {
            throw new customClasses_1.default.CustomError("Error al consultar la base de datos", 500);
        }
    });
}
/////Crear elemento nuevo en una tabla
function createTiEsTe(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            validations_1.default.checkJsonStructure(tableNameTiEsTe, item);
            validations_1.default.checkFieldRules(tableNameTiEsTe, 'tipodato', item);
            const fields = Object.entries(item)
                .map(([key]) => `${key}`)
                .join(", ");
            const values = Object.entries(item)
                .map(([_key, values]) => `'${values}'`)
                .join(", ");
            const SqlQuery = `Insert Into ${tableNameTiEsTe} (${fields}) Values (${values})`;
            yield dbConfig_1.POOL.query(SqlQuery);
            const SqlSearch = Object.entries(item)
                .map(([key, values]) => `${key} = '${values}'`)
                .join(" And ");
            const result = yield dbConfig_1.POOL.query(`Select * From ${tableNameTiEsTe} Where ${SqlSearch}`);
            return (result.rows);
        }
        catch (error) {
            throw new customClasses_1.default.CustomError(error.message, error.status);
        }
    });
}
function editTiEsTe(id, item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Id = validations_1.default.checkType(id, "number");
            validations_1.default.checkJsonStructure(tableNameTiEsTe, item);
            validations_1.default.checkFieldRules(tableNameTiEsTe, 'tipodato', item);
            yield findItem(tableNameTiEsTe, Id);
            /*const changes = Object.entries(item)
                .map(([key, values]) => `${key} = '${values}'`)
                .join(', ')
            await POOL.query(`Update ${tableNameTiEsTe} SET ${changes} Where id = ${Id}`)*/
            const searchQuery = Object.entries(item)
                .map(([key, values]) => `${key} = '${values}'`)
                .join(' And ');
            const result = yield dbConfig_1.POOL.query(`Select * From ${tableNameTiEsTe} Where ${searchQuery}`);
            console.log(result);
            return result.rows;
        }
        catch (error) {
            throw new customClasses_1.default.CustomError(error.message, error.statusCode);
        }
    });
}
exports.default = {
    createTiEsTe,
    editTiEsTe,
    listItems,
    findItem
};
