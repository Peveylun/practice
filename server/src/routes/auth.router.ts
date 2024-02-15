import {Router} from "express";
import authController from "../controllers/auth.controller";

const router: Router = Router();

router.post('/register', authController.create);

router.post('/login', authController.read);

export default router;