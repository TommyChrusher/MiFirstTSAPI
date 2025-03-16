import validations from "./validations/validations";
import customClass from "../config/customClasses";
import dbFunctions from "../config/dbFunctions";

//////Parametrización de distintas acciones a realizar en la tabla 'tiposestilostecnicas'
const tableName = "tiposestilostecnicas"

////Crear nuevo registro
const createTiEsTe = async (params: any) => {
    try{
        const result = await dbFunctions.createTiEsTe(params)
        return result
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}

////Enlistar todos los registros
const getAllTiEsTe = async () => {
    try {
        const result = await dbFunctions.listItems(tableName)
        return result.rows
    } catch (error) {
        throw new Error(String(error));
    }
}

////Obtener TIEsTe por ID
const getTiEsTe = async (id:any) => {
    try{
        const ID = validations.checkType(id,"number")
        const result = await dbFunctions.findItem(tableName,ID)
        if(result.length === 0){
            throw new customClass.CustomError("No se encontraron registros",404);
        }else{
            return result
        }
        
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode);
    }
}
////Editar TiEsTe

const editTiEsTe = async (id:any,params:any)=>{
    try{
        const data = params
        const result = dbFunctions.editTiEsTe(id,data)
        return result
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}

export default {
    createTiEsTe,
    editTiEsTe,
    getAllTiEsTe,
    getTiEsTe
}
