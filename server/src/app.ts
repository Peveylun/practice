import express, {Express} from "express";
import * as dotenv from "dotenv";

import Database from "./misc/db";

dotenv.config()

const HOST: string = process.env.HOST || "localhost";
// @ts-ignore
const PORT: number = +process.env.PORT || 80;
const MONGO_URI: string | undefined = process.env.MONGO_URI;

new Database(MONGO_URI)
    .init()
    .catch(e => console.log(e));

const app: Express = express()

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));