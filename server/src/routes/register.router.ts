import {Router} from "express";
import registerController from "../controllers/register.controller";

const router: Router = Router();

router.post('/', registerController.create);

export default router;