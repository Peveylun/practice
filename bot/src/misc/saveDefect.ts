import {bot} from "../app";
import axios from "axios";
import sharp from "sharp";
import TelegramBot from "node-telegram-bot-api";

export default {
    saveDefect: async(msg: TelegramBot.Message, roomNumber: any, description: any) => {
        try {
            const image = msg.photo;
            // @ts-ignore
            const imageId = image[image?.length - 1].file_id;
            const photoInfo = await bot.getFile(imageId)

            if (imageId && photoInfo.file_path) {
                const fileUrl = `https://api.telegram.org/file/bot${process.env.TOKEN}/${photoInfo.file_path}`;

                const res = await axios.get(fileUrl, { responseType: "arraybuffer" });

                const compressedImage = await sharp(res.data)
                    .jpeg({ quality: 60 })
                    .toBuffer()

                const blob = new Blob([compressedImage], { type: "image/jpg" })

                const formData = new FormData();
                // @ts-ignore
                formData.append('image', blob, { filename: 'image.jpg' });
                formData.append('roomNumber', roomNumber);
                formData.append('description', description);
                // @ts-ignore
                formData.append('telegramId', msg.from.id);

                const uploadResponse = await axios.post('http://localhost:8080/api/defects',
                    formData
                );

                console.log(uploadResponse);
            }
        } catch (e) {
            console.log('Error');
        }
    }
}