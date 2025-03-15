import { POOL } from "../config/dbConfig";
import validations from "./validations/validations";
import customClass from "../config/customClasses";
import dbFunctions from "../config/dbFunctions";

//////Parametrización de distintas acciones a realizar en la tabla 'tiposestilostecnicas'
const tableName = "tiposestilostecnicas"

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
const createTiEsTe = async (params: any) => {
    try{
        const result = await dbFunctions.creatItem(tableName,params)
        return result
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}

////Enlistar todos los registros
const getAllTiEsTe = async () => {
    try {
        const result = await POOL.query(`Select * From ${tableName}`)
        return result.rows
    } catch (error) {
        throw new Error(String(error));
    }
}

////Obtener TIEsTe por ID
const getTiEsTe = async (id:any) => {
    try{
        const ID = validations.checkType(id,"number")
        const result = await validations.findItem(tableName,ID)
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

export default {
    createTiEsTe,
    getAllTiEsTe,
    getTiEsTe
}
