import { Router } from "express";
import authController from "../controller/authController.js";
const router = Router();

router.route("/").get(authController.getUser).post(authController.authUser);

export default router;
