import {Router} from "express";
import registerController from "../controllers/auth.controller";

const router: Router = Router();

router.post('/', registerController.create);

export default router;