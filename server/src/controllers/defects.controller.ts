import {Request, Response} from "express";
import {Defect} from "../models/defect.model";
import {User} from "../models/user.model";
import path from "path";
import * as fs from "fs";

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

    read: async(_: Request, res: Response) => {
        try {
            const defects = await Defect.find().populate('reportedBy');
            res.status(200).json(defects);
        } catch (e) { res.status(500).json({error: 'Get defects failure'}) }
    },

    readOpenedDefects: async(_: Request, res: Response) => {
        try {
            const users = await Defect.find({status: false}).exec();
            res.status(200).json(users);
        } catch (e) { res.status(500).json({error: 'Get defects failure'}) }
    },

    update: async(req: Request, res: Response) => {
        try {
            const updatedDefect = await Defect.findByIdAndUpdate(req.params.id, {$set: {
                status: true,
                closedAt: Date.now()
            }});

            res.status(200).json(updatedDefect)
        } catch (e) { res.status(500).json({error: 'Update defect failure'}) }
    },

    readImage: async(req: Request, res: Response) => {
        try {
            const defect = await Defect.findOne({_id: req.params._id}).exec();
            if (!defect) return res.json({error: 'Defect not found'});
            const filename = defect.imageUrl;

            const imagePath = path.join(__dirname, '..', '..', 'uploads', filename);
            const imageBuffer = fs.readFileSync(imagePath);
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(imageBuffer, 'binary');
        } catch (e) {
            res.status(500).json({error: 'Image uploading error'});
        }
    }
}