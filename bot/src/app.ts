import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";
import AuthKeyboard from "./keyboards/authKeyboards";
import authHandler from "./handlers/authHandler";
import defectsHandler from "./handlers/defectsHandler";
import {closeDefect} from "./controllers/defectsController";
import state from './misc/state'

dotenv.config();

const TOKEN: string = process.env.TOKEN || "Need a token";

export const bot: TelegramBot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, async(msg) => {
    await bot.sendMessage(msg.chat.id, "Вітаю, оберіть дію", {
        "reply_markup": {
            "keyboard": AuthKeyboard.start
        }
    })
});


bot.on('message', authHandler.start);
bot.on('message', defectsHandler.defects);
bot.on('message', async (msg) => {
    const text = msg.text?.toLowerCase();
    if (text === 'закрити дефект') await closeDefect(msg, state.getState().defect);
})