import { KeyboardButton } from "node-telegram-bot-api";

const AuthKeyboard: KeyboardButton[][] = [
    [{ text: "Реєстрація" }, { text: "Вхід" }],
    [{ text: "Допомога" }]
];

export default AuthKeyboard;
