import * as express from 'express';
import fs from "fs";
import path from "path";

export const mangasApi = (app: express.Application) => {
    app.get('/', async (req, res, next) => {
        try {
            const mangas = JSON.parse(await fs.readFileSync(path.join(__dirname, "../data/mangas.json"), 'utf-8'))
            res.status(200).json({
                statusCode: 200,
                mangas,
                message: 'mangas listed'
            })
        } catch (e) {
            next(e)
        }
    });
}
