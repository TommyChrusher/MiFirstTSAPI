"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customClasses_1 = __importDefault(require("../../config/customClasses"));
/////validación de insert/updates tabla tiposestilostecnicas
const dataBaseValidationData = [
    {
        "nombre": "tiposestilostecnicas",
        "insertRules": [
            {
                "ruleName": "tipodato",
                "ruleValue": ['Tipo de Obra', 'Estilo', 'Tecnicas']
            },
            {
                "ruleName": "jsonStructure",
                "ruleValue": ['tipodato', 'nombredato', 'descripciondato']
            }
        ]
    },
    {
        "nombre": "artistas",
        "insertRules": [
            {
                "ruleName": "jsonStructure",
                "ruleValue": ['tipodato', 'nombredato', 'descripciondato']
            }
        ]
    }
];
function checkJsonStructure(tableName, json) {
    /////buscamos la reglas de validación para la tabla en cuestión
    const dataBaseRules = dataBaseValidationData.find(item => item.nombre === tableName);
    //// si la tabla no está en la lista devolvemos un error
    if (!dataBaseRules) {
        console.log(`No se encontraron reglas de validación para la tabla ${tableName}`);
        throw new customClasses_1.default.CustomError(`No se encontraron reglas de validación para la tabla ${tableName}`, 500);
    }
    //// buscamos la regla de jsonStructure (toda DB del proyecto debe tenerla)
    const jsonStructureRule = dataBaseRules.insertRules.find(item => item.ruleName === "jsonStructure");
    if (!jsonStructureRule) {
        console.error(`No hay reglas de estructura definidas para la tabla: ${tableName}`);
        throw new customClasses_1.default.CustomError(`No hay reglas de estructura definidas para la tabla: ${tableName}`, 500);
    }
    const result = jsonStructureRule.ruleValue.every((field) => json.hasOwnProperty(field));
    if (result === false) {
        throw new customClasses_1.default.CustomError("La estructura de datos es invalida", 400);
    }
}
function checkFieldRules(tableName, fieldName, value) {
    /////buscamos la reglas de validación para la tabla en cuestión
    const dataBaseRules = dataBaseValidationData.find(item => item.nombre === tableName);
    //// si la tabla no está en la lista devolvemos un error
    if (!dataBaseRules) {
        console.log(`No se encontraron reglas de validación para la tabla ${tableName}`);
        throw new customClasses_1.default.CustomError(`No se encontraron reglas de validación para la tabla ${tableName}`, 500);
    }
    //// buscamos la regla del campo
    const fieldDataRule = dataBaseRules.insertRules.find(item => item.ruleName === fieldName);
    if (!fieldDataRule) {
        console.error(`No hay reglas de estructura definidas para la tabla: ${tableName}`);
        throw new customClasses_1.default.CustomError(`No hay reglas de estructura definidas para la tabla: ${tableName}`, 500);
    }
    const example = `[${fieldDataRule.ruleValue}]`;
    const dato = value[fieldName];
    const result = fieldDataRule.ruleValue.includes(dato);
    if (result === false) {
        throw new customClasses_1.default.CustomError(`El valor para el campo ${fieldName} es invalido, debe ser alguno de estos ${example}`, 400);
    }
}
/////Checktype function
function checkType(value, type) {
    if (typeof (value) === type) {
        return value;
    }
    else {
        if (typeof (value) === "string" && type === "number" && !Number.isNaN(parseInt(value, 10))) {
            try {
                const result = parseInt(value, 10);
                return result;
            }
            catch (error) {
                throw new customClasses_1.default.CustomError(`Tipo de dato no valido, se esperaba ${type} y se recibió un ${typeof (value)}`, 400);
            }
        }
        else {
            throw new customClasses_1.default.CustomError(`Tipo de dato no valido, se esperaba ${type} y se recibió un ${typeof (value)}`, 400);
        }
    }
}
exports.default = {
    checkFieldRules,
    checkJsonStructure,
    checkType
};
