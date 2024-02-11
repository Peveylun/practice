import {Router} from "express";
import DefectsController from "../controllers/defects.controller";
import {upload} from "../misc/image_handler";

const router: Router = Router();

router.get('/', DefectsController.read);

router.put('/:id/close', DefectsController.update);

router.post('/', upload.single('image'), DefectsController.create);



export default router;