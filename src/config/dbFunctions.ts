import { POOL } from "../config/dbConfig";
import customClass from "./customClasses";
import validations from "../controller/validations/validations";
/////nombre de la tabla tieste
const tableNameTiEsTe = "tiposestilostecnicas"

/////Buscar elemento de tabla por ID
async function findItem(tableName: string, id: number) {
    try {
        const result = JSON.parse(JSON.stringify((await POOL.query(`Select * from ${tableName} 
        Where id = ${id}`))))
        if (
            result.rows.length === 0
        ) {
            throw new customClass.CustomError(`No se encontró el elemento con id ${id}`, 404)
        } else {
            return result.rows
        }
    } catch (error: any) {
        throw new customClass.CustomError(error.message, error.statusCode)
    }
}
/////Enlistar todos los elementos de la tabla
async function listItems(tableName: string) {
    try {
        const dbResponse = await POOL.query(`Select * from ${tableName}`)
        const result = JSON.parse(JSON.stringify(dbResponse))
        return result
    } catch (error) {
        throw new customClass.CustomError("Error al consultar la base de datos", 500)
    }
}
/////Crear elemento nuevo en una tabla
async function createTiEsTe(item: any) {
    try {
        validations.checkJsonStructure(tableNameTiEsTe, item)
        validations.checkFieldRules(tableNameTiEsTe, 'tipodato', item)
        const fields = Object.entries(item)
            .map(([key]) => `${key}`)
            .join(", ");
        const values = Object.entries(item)
            .map(([_key, values]) => `'${values}'`)
            .join(", ");
        const SqlQuery = `Insert Into ${tableNameTiEsTe} (${fields}) Values (${values})`
        await POOL.query(SqlQuery)
        const SqlSearch = Object.entries(item)
            .map(([key, values]) => `${key} = '${values}'`)
            .join(" And ");
        const result = await POOL.query(`Select * From ${tableNameTiEsTe} Where ${SqlSearch}`)
        return (result.rows)
    } catch (error: any) {
        throw new customClass.CustomError(error.message, error.status)
    }
}

async function editTiEsTe(id: number, item: any) {
    try {
        const Id = validations.checkType(id, "number");
        validations.checkJsonStructure(tableNameTiEsTe, item)
        validations.checkFieldRules(tableNameTiEsTe, 'tipodato', item)
        await findItem(tableNameTiEsTe, Id)
        /*const changes = Object.entries(item)
            .map(([key, values]) => `${key} = '${values}'`)
            .join(', ')
        await POOL.query(`Update ${tableNameTiEsTe} SET ${changes} Where id = ${Id}`)*/
        const searchQuery = Object.entries(item)
            .map(([key, values]) => `${key} = '${values}'`)
            .join(' And ')
        const result = await POOL.query(`Select * From ${tableNameTiEsTe} Where ${searchQuery}`)
        return result.rows
    }
    catch (error: any) {
        throw new customClass.CustomError(error.message, error.statusCode)
    }
}

export default {
    createTiEsTe,
    editTiEsTe,
    listItems,
    findItem
}