import TelegramBot from "node-telegram-bot-api";
import {bot} from "../app";
import axios from "axios";
import saveDefect from "../misc/saveDefect";
import findTechnicalWorkers from "../misc/findTechnicalWorkers";

export default {
    create: async(msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;

        const user = await axios.get(`http://localhost:8080/api/users/${msg.from?.id}`);

        if (user.data.role === 'User') return await bot.sendMessage(chatId, 'Доступ заборонений');

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
                                    const res = await axios.get(`http://localhost:8080/api/users`);
                                    const users = findTechnicalWorkers.findTechnicalWorkers(res.data);
                                    for (const i of users) {
                                        try {
                                            await bot.sendMessage(i.telegramId, 'Зареєстровано новий дефект');
                                        } catch (e) {console.log('User not founded')}
                                    }
                                });
                            })
                    });
                });
            });
        });
    },
    read: async(msg: TelegramBot.Message) => {
        try {
            const chatId = msg.chat.id;

            const defects = await axios.get(`http://localhost:8080/api/defects`);
            const defect = defects.data[0];
            const template = `Номер кімнати: ${defect.roomNumber}\nОпис: ${defect.description}\nФото:`
            await bot.sendMessage(chatId, template);
            console.log(`${__filename}/../../uploads/${defect.imageUrl}`);
            await bot.sendPhoto(chatId, 'test');
        } catch (e) { console.log('Error')}
    }
}