import {Router} from "express";
import AdminsController from "../controllers/admins.controller";

const router = Router();

router.get('/', AdminsController.read);

export default router;