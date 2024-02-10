import {Request, Response} from "express";
import {upload} from '../misc/image_handler';

export default {
    create: async(req: Request, res: Response) => {
        try {
            upload(req, res, err => {
                if (err) {
                    console.log('Error uploading an image')
                    res.status(500).json({error: 'Error uploading an image'})
                    return;
                }

                res.status(200).json({error: 'Download successful'});
            })
        } catch (e) { res.status(500).json({error: 'Create defect failure'}) }
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