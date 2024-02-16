import TelegramBot from "node-telegram-bot-api";
import { bot } from "../app";
import axios from "axios";
import saveDefect from "../misc/saveDefect";
import findTechnicalWorkers from "../misc/findTechnicalWorkers";
import authKeyboards from "../keyboards/authKeyboards";
import state from "../misc/state";
import { IDefect } from "../misc/state";

let counter = 0;



export async function closeDefect(msg: TelegramBot.Message, defect: IDefect) {
    try {
        console.log(defect);
        await axios.put(`http://localhost:8080/api/defects/${defect._id}/close`);
        await bot.sendMessage(msg.chat.id, "Дефект закрито успішно");
    } catch (e) {
        await bot.sendMessage(msg.chat.id, "Помилка під час закриття дефекту");
    }
}

export default {
    create: async(msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;

        const user = await axios.get(`http://localhost:8080/api/users/${msg.from?.id}`);

        if (!(user.data.role === 'Technical')) return await bot.sendMessage(chatId, 'Доступ заборонений');

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
            bot.removeTextListener(/Закрити дефект/);
            const chatId = msg.chat.id;

            const user = await axios.get(`http://localhost:8080/api/users/${msg.from?.id}`);

            if (!(user.data.role === 'Repairman')) return await bot.sendMessage(chatId, 'У вас немає доступу');

            const defects = await axios.get(`http://localhost:8080/api/defects/getOpened`);
            const defect = defects.data[counter];

            if (!defect) return await bot.sendMessage(chatId, 'Дефекти відсутні');

            state.setState({ defect: defect });

            if (counter < defects.data.length - 1) counter++;
            else if (counter === defects.data.length - 1) counter = 0;

            const imageResponse = await axios.get(`http://localhost:8080/api/defects/${defect._id}`, {
                responseType: 'arraybuffer'
            });

            const template = `Номер кімнати: ${defect.roomNumber}\nОпис: ${defect.description}`;
            await bot.sendMessage(chatId, template)
            await bot.sendPhoto(chatId, Buffer.from(imageResponse.data, 'binary'));

            await bot.sendMessage(chatId, 'Опції', {
                reply_markup: {
                    keyboard: authKeyboards.closeDefect
                }
            });

        } catch (e) {
            console.log(e);
        }
    }

}