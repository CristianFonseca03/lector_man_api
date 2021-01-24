import cors from 'cors';
import express from 'express';
import * as dotenv from "dotenv";
import helmet from "helmet";
// routes
import * as routes from "./routes";

dotenv.config();

if (!process.env.PORT) {
    // tslint:disable-next-line:no-console
    console.log(`Error to get ports`);
    process.exit(1);
}
if (!process.env.CORS_ALLOW_LIST) {
    // tslint:disable-next-line:no-console
    console.log(`Error to get CORS ALLOW LIST`);
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const CORS_URL_ALLOW_LIST: string[] = process.env.CORS_ALLOW_LIST.split(';') as string[];
let corsOptionsDelegate = (req: any, callback: any) => {
    let corsOptions;
    if (CORS_URL_ALLOW_LIST.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true} // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {origin: false} // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
const app = express();

app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use('/images', express.static(__dirname + '/images'));
routes.mangasApi(app);
routes.response404(app);

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}`);
});
