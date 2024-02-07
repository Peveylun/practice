import {Router, Request, Response} from "express";

const router: Router = Router();

router.post('/', (_: Request, res: Response) => {
    res.send('POST /api/register');
})

export default router;