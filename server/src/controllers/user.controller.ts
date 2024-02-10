import {Request, Response} from "express";
import {User} from "../models/user.model";

export default {
    getAll: async(_: Request, res: Response) => {
        try {
            const users = await User.find();

            if (!users) res.json({error: 'Users not found'});
            else res.json(users);
        } catch (e) { res.json('Search failure') }
    },
    getOne: async(req: Request, res: Response) => {
        try {
            const user = await User.findOne({telegramId: req.params.telegramId});

            if (!user) res.json({error: 'User not found'})
            else res.json(user);
        } catch (e) { res.json({error: 'Search failure'}) }
    },
    update: async(req: Request, res: Response) => {
        try {
            await User.updateOne({telegramId: req.params.telegramId}, {$set: {
                    name: req.body.name,
                    surname: req.body.surname,
                    access: req.body.access,
                    role: req.body.role
                }});

            res.json({message: "User updated"});
        } catch (e) { res.json({error: 'Update failure'}) }
    },
    delete: async(req: Request, res: Response) => {
        try {
            await User.deleteOne({telegramId: req.params.telegramId});

            res.json({message: "User deleted"});
        } catch (e) { res.json({error: 'Delete failure'}) }
    }
}