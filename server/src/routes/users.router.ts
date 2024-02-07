import {Router, Request, Response} from "express";

const router = Router();

router.get('/', (_: Request, res: Response) => {
    res.send('GET /api/users');
});

router.get('/:id', (_: Request, res: Response) => {
    res.send('GET /api/users/:id');
})

router.put('/:id', (_: Request, res: Response) => {
    res.send('PUT /api/users/:id');
});

router.get('/', (_: Request, res: Response) => {
    res.send('GET /api/users/:id');
});

export default router;