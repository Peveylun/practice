import {Request, Response} from "express";
import {User} from "../models/user.model";

export default {
    getAll: async(_: Request, res: Response) => {
        const users = await User.find();

        res.json(users);
    },
    getOne: async(req: Request, res: Response) => {
        const user = await User.findOne({telegramId: req.params.telegramId});

        res.json(user);
    },
    update: async(req: Request, res: Response) => {
        await User.updateOne({telegramId: req.params.telegramId}, {$set: {
                name: req.body.name,
                surname: req.body.surname,
                access: req.body.access,
                role: req.body.role
            }});

        res.json({message: "User updated"});
    },
    delete: async(req: Request, res: Response) => {
        await User.deleteOne({telegramId: req.params.telegramId});

        res.json({message: "User deleted"});
    }
}