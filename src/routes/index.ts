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
    app.get('/:mangaUrlTag/:chapter', async (req, res) => {
        try {
            const {mangaUrlTag, chapter} = req.params
            const images = await fs.readdirSync(path.join(__dirname, `../images/mangas/${mangaUrlTag}/${chapter}`)).map(file => {
                return {
                    name: file.replace('.png', ''),
                    file: `/images/mangas/${mangaUrlTag}/${chapter}/${file}`
                }
            })
            res.status(200).json({
                statusCode: 200,
                images,
                message: 'files listed'
            })
        } catch (e) {
            res.status(404).json({
                statusCode: 404,
                message: 'chapter not found.'
            })
        }
    });
}

export const response404 = (app: express.Application) => {
    app.get('*', (req, res) => {
        res.status(404).json({
            statusCode: 404,
            message: 'not found'
        })
    });
}
