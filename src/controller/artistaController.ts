/*import { POOL } from "../config/dbConfig";
import validations from "./validations/validations";
import customClass from "../config/customClasses";

////Variable con el nombre de la tabla
const tableName = "artistas"

////Crear Artitas
const createArtist = async () => {

}

////Editar artistas
const editArtist = async () => {

}

////Enlistar artistas
const getAllArtist = async () => {

}

////Buscar artista
const getArtist = async (id:any) => {
    try {
        const ID = validations.checkType(id, "number");
        const result = await validations.findItem(tableName, ID)
        return result
    } catch (error:any){
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}

export default {
    createArtist,
    editArtist,
    getArtist,
    getAllArtist
}*/