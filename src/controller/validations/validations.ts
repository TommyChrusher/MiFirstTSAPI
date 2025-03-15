import { POOL } from "../../config/dbConfig";
import customClass from "../../config/customClasses";


/////validación de insert/updates tabla tiposestilostecnicas
const dataBaseValidationData = [
    {
        "nombre":"tiposestilostecnicas",
        "insertRules":[
            {
                "ruleName":"tipodato",
                "ruleValue":['Tipo de Obra','Estilo','Tecnicas']
            },
            {
                "ruleName":"jsonStructure",
                "ruleValue":['tipodato','nombredato','descripciondato']
            }
        ]
    },
    {
        "nombre":"artistas",
        "insertRules":[
            {
                "ruleName":"jsonStructure",
                "ruleValue":['tipodato','nombredato','descripciondato']
            }
        ]
    }
]


function checkJsonStructure(tableName:string,json: any){
    /////buscamos la reglas de validación para la tabla en cuestión
    const dataBaseRules = dataBaseValidationData.find(item => item.nombre === tableName)
    //// si la tabla no está en la lista devolvemos un error
    if(!dataBaseRules){
        console.log(`No se encontraron reglas de validación para la tabla ${tableName}`);
        throw new customClass.CustomError(`No se encontraron reglas de validación para la tabla ${tableName}`,500)
    }
    //// buscamos la regla de jsonStructure (toda DB del proyecto debe tenerla)
    const jsonStructureRule = dataBaseRules.insertRules.find(item => item.ruleName === "jsonStructure")
    if (!jsonStructureRule) {
        console.error(`No hay reglas de estructura definidas para la tabla: ${tableName}`);
        throw new customClass.CustomError(`No hay reglas de estructura definidas para la tabla: ${tableName}`,500)
    }
    const result = jsonStructureRule.ruleValue.every((field: string) => json.hasOwnProperty(field));
    if(result === false) {
        throw new customClass.CustomError("La estructura de datos es invalida",400)
    }
}

function checkFieldRules (tableName: string, fieldName:string, value:any){
    /////buscamos la reglas de validación para la tabla en cuestión
    const dataBaseRules = dataBaseValidationData.find(item => item.nombre === tableName)
    //// si la tabla no está en la lista devolvemos un error
    if(!dataBaseRules){
        console.log(`No se encontraron reglas de validación para la tabla ${tableName}`);
        throw new customClass.CustomError(`No se encontraron reglas de validación para la tabla ${tableName}`,500)
    }
    //// buscamos la regla del campo
    const fieldDataRule = dataBaseRules.insertRules.find(item => item.ruleName === fieldName)
    if (!fieldDataRule) {
        console.error(`No hay reglas de estructura definidas para la tabla: ${tableName}`);
        throw new customClass.CustomError(`No hay reglas de estructura definidas para la tabla: ${tableName}`,500)
    }
    const example =`[${fieldDataRule.ruleValue}]`
    const dato = value[fieldName]
    const result = fieldDataRule.ruleValue.includes(dato)
    if(
        result === false
    ){
        throw new customClass.CustomError(`El valor para el campo ${fieldName} es invalido, debe ser alguno de estos ${example}`,400)
    }
}
/////Checktype function
function checkType(value:any,type:string){
    if(
        typeof(value) === type
    ){
        return value
    } else {
        if(typeof(value) === "string" && type === "number" &&  !Number.isNaN(parseInt(value,10))){
            try{
                const result = parseInt(value,10)
                return result
            } catch (error) {
                throw new customClass.CustomError(`Tipo de dato no valido, se esperaba ${type} y se recibió un ${typeof(value)}`,400)
            }
        } else{
            throw new customClass.CustomError(`Tipo de dato no valido, se esperaba ${type} y se recibió un ${typeof(value)}`,400)
        }
        
    }
}
///////Validar si un registro exite antes de editarlo
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

export default{
    checkFieldRules,
    checkJsonStructure,
    checkType,
    findItem
}