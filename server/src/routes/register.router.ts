import {Router, Request, Response} from "express";

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    res.send('POST /api/register');
})

export default router;