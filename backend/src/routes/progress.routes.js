import { Router } from "express";
import { progressUser } from "../controllers/progress.controller.js";

const router = Router();

router.route('/progress').get(progressUser)

export default router