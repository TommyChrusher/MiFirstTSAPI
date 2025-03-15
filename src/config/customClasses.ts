///////Script en donde se crean clases especiales para el proyecto

/////esta e suna clase que modifica la clase por defecto de TypeScript Error
////y nos permite modificarla para que los errores ahora puedan tener texto y codigo de estatus
class CustomError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default {
    CustomError
}