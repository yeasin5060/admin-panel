import express from "express";

import auth from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

import {
  getSettings,
  updateSettings,
} from "../controllers/adSetting.controller.js";

const router = express.Router();

router.get("/", auth, isAdmin, getSettings);

router.put("/", auth, isAdmin, updateSettings);

export default router;