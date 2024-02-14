import { KeyboardButton } from "node-telegram-bot-api";

export default {
    start: [
        [{ text: "Реєстрація" }, { text: "Вхід" }],
        [{ text: "Допомога" }]
    ] as KeyboardButton[][],
    defects: [
        [{ text: "Додати дефект"}, { text: "Дефекти"}],
        [{ text: "Допомога" }]
    ] as KeyboardButton[][],
    closeDefect: [
        [{text: "Закрити дефект"}, {text: "Дефекти"}]
    ] as unknown as KeyboardButton[][]

};
