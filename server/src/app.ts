import express, {Express} from "express"
import * as dotenv from "dotenv"

dotenv.config()

const HOST: string = process.env.HOST || "localhost";
// @ts-ignore
const PORT: number = +process.env.PORT || 80;

const app: Express = express()

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));

console.log("Hello, World!")