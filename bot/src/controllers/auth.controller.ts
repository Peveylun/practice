import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import {bot} from "../app";

export default {
    register: async(msg: TelegramBot.Message) => {
        try {
            await axios.post('http://localhost:8080/api/auth', {
                telegramId: msg.from?.id,
                name: msg.from?.first_name,
                surname: msg.from?.last_name
            });
        } catch (e) {
            console.error('User already registered');
        }
    },
    login: async(msg: TelegramBot.Message) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/users/${msg.from?.id}`);
            const user = res.data;

            console.log(user);

            if (!user.telegramId) return await bot.sendMessage(msg.chat.id, 'Login failure');

            await bot.sendMessage(msg.chat.id, 'Login successful');
        } catch (e) {
            await bot.sendMessage(msg.chat.id, 'Login failure');
        }
    }
}