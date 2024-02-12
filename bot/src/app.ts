import TelegramBot from "node-telegram-bot-api";
import authController from "./controllers/auth.controller";
import * as dotenv from "dotenv";

dotenv.config();

const TOKEN: string = process.env.TOKEN || "Need a token";

export const bot: TelegramBot = new TelegramBot(TOKEN, { polling: true });

// bot.onText(/\/start/, authController.register);

bot.onText(/\/login/, authController.login);