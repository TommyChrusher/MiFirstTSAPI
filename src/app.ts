import express from "express";
import dotenv from 'dotenv';
import TiEsTeRouter from './routes/TiEsTeRouter'

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello TypeScript")
});

app.use('/TiEsTe', TiEsTeRouter)


const serverPort = process.env.PORT

app.listen(serverPort, () => {
    console.log("Server corriendo en el puerto 3000")
})