import TelegramBot from "node-telegram-bot-api";
import defectsController from "../controllers/defectsController";

export default {
    defects: async(msg: TelegramBot.Message) => {
        const text = msg.text?.toLowerCase();

        switch (text) {
            case 'додати дефект':
                await defectsController.create(msg);
                break;
            case 'дефекти':
                await defectsController.read(msg);
                break;
        }
    }
}