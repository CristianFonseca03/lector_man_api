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

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/images', express.static(__dirname + '/images'));
routes.mangasApi(app);

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}`);
});
