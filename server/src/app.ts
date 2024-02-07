import express, {Express, Request, Response} from "express";
import * as dotenv from "dotenv";

import Database from "./misc/db";

import registerRouter from "./routes/register.router";
import usersRouter from "./routes/users.router";
import defectsRouter from "./routes/defects.router";

dotenv.config()

const HOST: string = process.env.HOST || "localhost";
// @ts-ignore
const PORT: number = +process.env.PORT || 80;
const MONGO_URI: string | undefined = process.env.MONGO_URI;

new Database(MONGO_URI)
    .init()
    .catch(e => console.log(e));

const app: Express = express();

app.use('/api/register', registerRouter);
app.use('/api/users', usersRouter);
app.use('/api/defects', defectsRouter);

app.get('/', (_: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));