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
if (!process.env.CORS_URL) {
    // tslint:disable-next-line:no-console
    console.log(`Error to get CORS url`);
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const CORS_URL: string = process.env.CORS_URL as string;
const app = express();

app.use(helmet());
app.use(cors({origin: CORS_URL, credentials: true,}));
app.use(express.json());

app.use('/images', express.static(__dirname + '/images'));
routes.mangasApi(app);
routes.response404(app);

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}`);
});
