import { Router } from "express";
import TiEsTeController from "../controller/TiEsTeController";

const TiEsTeRouter = Router();


TiEsTeRouter.post('/', async (req, res) => {
    try {
        const result = await TiEsTeController.createTiEsTe(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }

})

TiEsTeRouter.get('/all', async (_req, res) => {
    try {
        const result = await TiEsTeController.getAllTiEsTe()
        res.status(200).json(result)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

TiEsTeRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await TiEsTeController.getTiEsTe(id)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(error.statusCode).json({ error: error.message })
    }
})

/*TiEsTeRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const result = await TiEsTeController.editTiEsTe(id, body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(error.statusCode).json({ error: error.message })
    }
})*/
export default TiEsTeRouter;