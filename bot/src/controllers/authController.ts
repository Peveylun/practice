import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import {bot} from "../app";
import authKeyboards from "../keyboards/authKeyboards";

export default {
    register: async(msg: TelegramBot.Message) => {
        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                telegramId: msg.from?.id,
                name: msg.from?.first_name,
                surname: msg.from?.last_name
            });

            await bot.sendMessage(msg.chat.id, 'Ви успішно зареєструвалися, очікуйте відповідь адміністратора.');
        } catch (e) {
            await bot.sendMessage(msg.chat.id, 'Користувач вже зареєстрований');
        }
    },
    login: async(msg: TelegramBot.Message) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/users/${msg.from?.id}`);
            const user = res.data;

            console.log(user);

            if (!user.telegramId) return await bot.sendMessage(msg.chat.id, 'Користувача не знайдено');

            await bot.sendMessage(msg.chat.id, 'Оберіть потрібну опцію', {
                "reply_markup": {
                    "keyboard": authKeyboards.defects
                }
            });
        } catch (e) {
            await bot.sendMessage(msg.chat.id, 'Login failure');
        }
    },
    help: async(msg: TelegramBot.Message)=> {
        await bot.sendMessage(msg.chat.id, 'Help');
    }
}