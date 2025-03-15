import { POOL } from "../config/dbConfig";
import customClass from "./customClasses";
import validations from "../controller/validations/validations";


/////Buscar elemento de tabla por ID
async function  findItem (tableName:string, id:number){
    try{
        const result =JSON.parse(JSON.stringify(( await POOL.query(`Select * from ${tableName} 
        Where id = ${id}`))))
        if(
           result.rows.length === 0
        ){
            throw new customClass.CustomError(`No se encontró el elemento con id ${id}`,404)
        }else{
            return result.rows
        }
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.statusCode)
    }
}
/////Enlistar todos los elementos de la tabla
async function listItems(tableName:string) {
    try{
        const dbResponse = await POOL.query(`Select * from ${tableName}`)
        const result = JSON.parse(JSON.stringify(dbResponse))
        return result
    } catch (error) {
        throw new customClass.CustomError("Error al consultar la base de datos",500)
    }
}
/////Crear elemento nuevo en una tabla
async function creatItem(tableName:string,item:any) {
    try{
        validations.checkJsonStructure(tableName,item)
        validations.checkFieldRules(tableName,'tipodato',item)
        const fields = Object.entries(item)
        .map(([key]) => `${key}`)
        .join(", ");
        const values = Object.entries(item)
        .map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
            .join(", ");
        await POOL.query(`Insert into ${tableName} (${fields}) Values ${values}`)
        const result = await POOL.query(`Select * From ${tableName} Where ${values}`)
        return(result.rows)
    } catch (error:any) {
        throw new customClass.CustomError(error.message,error.status)
    }
}

export default{
    creatItem,
    listItems,
    findItem
}