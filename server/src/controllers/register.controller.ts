import {Request, Response} from "express";
import {User} from "../models/user.model";

export default {
    create: async (req: Request, res: Response) => {
        const {telegramId, name, surname} = req.body;
        const user = new User({
            telegramId,
            name,
            surname,
            registeredAt: new Date(),
            role: "User",
            work_score: 0
        });

        await user.save();
    }
}