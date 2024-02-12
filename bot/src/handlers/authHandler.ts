import TelegramBot from "node-telegram-bot-api";
import authController from "../controllers/authController";

export default {
    start: async(msg: TelegramBot.Message) => {
        const text = msg.text?.toLowerCase();

        switch (text) {
            case 'реєстрація':
                await authController.register(msg);
                break;
            case 'вхід':
                await authController.login(msg);
                break;
            case 'допомога':
                await authController.help(msg);
                break;
        }
    }
}