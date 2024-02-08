import {Router, Request, Response} from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get('/', userController.getAll);

router.get('/:telegramId', userController.getOne);

router.put('/:telegramId', userController.update);

router.delete('/:telegramId', userController.delete);

export default router;