import {Request, Response} from "express";
import {User} from "../models/user.model";

export default {
    create: async (req: Request, res: Response) => {
        try {
            const {telegramId, name, surname} = req.body;

            const existedUser = await User.findOne({ telegramId });

            if (existedUser) return res.status(400).json({error: 'User already registered'})

            const newUser = await User.create({
                telegramId,
                name,
                surname,
                registeredAt: new Date(),
                role: "User",
                work_score: 0
            });
            res.status(200).json(newUser);
        } catch (e) {
            res.status(500).json({error: 'Registration failed'});
        }
    }
}