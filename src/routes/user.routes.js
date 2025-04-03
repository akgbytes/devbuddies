import { Router } from "express";
import { registerUser, verifyUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify/:token").get(verifyUser);

export default router;
