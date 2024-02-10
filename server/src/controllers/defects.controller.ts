import {Request, Response} from "express";

export default {
    create: async(req: Request, res: Response) => {
        try {

        } catch (e) { res.json({error: 'Create defect failure'}) }
    },
    read: async(req: Request, res: Response) => {
        try {

        } catch (e) { res.json({error: 'Get defects failure'}) }
    },
    update: async(req: Request, res: Response) => {
        try {

        } catch (e) { res.json({error: 'Update defect failure'}) }
    }
}