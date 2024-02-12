import TelegramBot, {KeyboardButton} from "node-telegram-bot-api";
import authController from "./controllers/auth.controller";
import * as dotenv from "dotenv";
import AuthKeyboard from "./keyboards/auth";

dotenv.config();

const TOKEN: string = process.env.TOKEN || "Need a token";

export const bot: TelegramBot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, async(msg) => {
    await bot.sendMessage(msg.chat.id, "Вітаю, оберіть дію", {
        "reply_markup": {
            "keyboard": AuthKeyboard
        }
    })
});

bot.onText(/\/login/, authController.login);