import TelegramBot from "node-telegram-bot-api";
import {bot} from "../app";
import axios from "axios";
import sharp from "sharp";
import saveDefect from "../misc/saveDefect";

export default {
    create: async(msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, "Введіть номер кімнати.").then(() => {
            bot.once("message", (msg) => {
                const roomNumber = msg.text;

                // Очікування другого повідомлення
                bot.sendMessage(chatId, "Введіть опис.").then(async() => {
                    bot.once("message", async (msg) => {
                        const description = msg.text;

                        // Очікування третього повідомлення
                        await bot.sendMessage(chatId, "Завантажте зображення.")
                            .then(() => {
                                bot.once("photo", async (msg) => {
                                    await saveDefect.saveDefect(msg, roomNumber, description);
                                });
                            })
                    });
                });
            });
        });
    }
}