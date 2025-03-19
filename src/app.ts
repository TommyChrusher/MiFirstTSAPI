import express from "express";
import dotenv from 'dotenv';
import TiEsTeRouter from './routes/TiEsTeRouter'

dotenv.config();

const app = express();

app.use(express.json());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", ["https://*.powerapps.com", "https://apps.powerapps.com"]); // Permite todos los dominios (puedes restringirlo)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get("/", (_req, res) => {
    res.send("Hello TypeScript")
});

app.use('/TiEsTe', TiEsTeRouter)


const serverPort = process.env.PORT

app.listen(serverPort, () => {
    console.log("Server corriendo en el puerto 3000")
})