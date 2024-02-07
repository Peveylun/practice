import {Router, Request, Response} from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('GET /api/users');
});

router.get('/:id', (req: Request, res: Response) => {
    res.send('GET /api/users/:id');
})

router.put('/:id', (req: Request, res: Response) => {
    res.send('PUT /api/users/:id');
});

router.get('/', (req: Request, res: Response) => {
    res.send('GET /api/users/:id');
});

export default router;