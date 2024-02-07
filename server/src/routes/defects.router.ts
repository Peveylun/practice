import {Router, Request, Response} from "express";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('POST /api/defects');
})

router.put('/:id/close', (req: Request, res: Response) => {
    res.send('POST /api/defects/:id/close');
})

router.post('/', (req: Request, res: Response) => {
    res.send('POST /api/defects');
})



export default router;