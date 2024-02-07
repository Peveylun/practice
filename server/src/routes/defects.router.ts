import {Router, Request, Response} from "express";

const router: Router = Router();

router.get('/', (_: Request, res: Response) => {
    res.send('POST /api/defects');
})

router.put('/:id/close', (_: Request, res: Response) => {
    res.send('POST /api/defects/:id/close');
})

router.post('/', (_: Request, res: Response) => {
    res.send('POST /api/defects');
})



export default router;