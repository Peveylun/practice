import {Request, Response} from "express";
import {User} from "../models/user.model";
import {Admin} from "../models/admin.model";

import jwt from 'jsonwebtoken';

const generateToken = (login: string, name: string, surname: string) => {
    const payload = { login, name, surname };

    return jwt.sign(payload, process.env.SECRET_KEY || 'SECRET_KEY', {expiresIn: "24h"});
}

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
                role: "User"
            });
            res.status(200).json(newUser);
        } catch (e) {
            res.status(500).json({error: 'Registration failed'});
        }
    },

    read: async (req: Request, res: Response)=> {
        try {
            const {login, password} = req.body;
            const user = await Admin.findOne({login});

            if (!user) return res.status(400).json({error: 'User not founded'});
            if (!(password === user.password)) return res.status(400).json({error: 'Incorrect password'});

            const token = generateToken(user.login, user.name, user.surname);

            res.status(200).json({token});
        } catch (e) { return res.json({error: 'Login failure'}); }
    }
}