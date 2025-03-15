import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

export const POOL = new pg.Pool({
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    ssl: { rejectUnauthorized: false }
})


POOL.connect()
.then(()=>console.log("Conexión exitosa"))
.catch(error =>console.log("Error conectando",error))