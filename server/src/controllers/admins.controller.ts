import {Request, Response} from "express";
import {Admin} from "../models/admin.model";

export default {
    read: async (_: Request, res: Response) => {
        try {
            const admins = await Admin.find();

            res.status(200).json(admins);
        } catch (e) {
            res.status(400).json({error: "Admin search failure"})
        }
    }
}