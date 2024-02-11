import {Request, Response} from "express";

export default {
    create: async (req: Request, res: Response) => {
        try {
            res.status(200).json({error: 'File uploaded successful'});
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