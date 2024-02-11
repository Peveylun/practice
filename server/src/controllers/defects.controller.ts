import {Request, Response} from "express";
import {Defect} from "../models/defect.model";
import {User} from "../models/user.model";

export default {
    create: async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({telegramId: req.body.telegramId});

            if (!user) { return res.status(500).json({error: 'Error uploading image'}) }

            const newDefect = await Defect.create({
                roomNumber: req.body.roomNumber,
                description: req.body.description,
                reportedBy: user._id,
                imageUrl: req.file?.filename
            });

            res.status(200).json(newDefect);
        } catch (e) {
            console.log('Create defect failure');
            res.status(500).json({ error: 'Create defect failure' });
        }
    },

    read: async(req: Request, res: Response) => {
        try {

        } catch (e) { res.status(500).json({error: 'Get defects failure'}) }
    },

    update: async(req: Request, res: Response) => {
        try {

        } catch (e) { res.status(500).json({error: 'Update defect failure'}) }
    }
}