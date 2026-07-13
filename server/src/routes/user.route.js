import { Router } from "express";
import { changePassword, deleteUser, getProfile, loginUser, logout, registerUser, updateProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();


router.post('/register', registerUser);
router.post('/login',loginUser);

router.get("/profile", auth, getProfile);

router.put("/profile", auth, updateProfile);

router.put("/change-password", auth, changePassword);

router.delete("/delete-account", auth, deleteUser);

router.post("/logout", auth, logout);

export default router;