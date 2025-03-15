"use strict";
///////Script en donde se crean clases especiales para el proyecto
Object.defineProperty(exports, "__esModule", { value: true });
/////esta e suna clase que modifica la clase por defecto de TypeScript Error
////y nos permite modificarla para que los errores ahora puedan tener texto y codigo de estatus
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = {
    CustomError
};
