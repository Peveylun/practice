import {Router} from "express";
import DefectsController from "../controllers/defects.controller";

const router: Router = Router();

router.get('/', DefectsController.read);

router.put('/:id/close', DefectsController.update);

router.post('/', DefectsController.create);



export default router;