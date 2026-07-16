import express from "express";

import auth from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import isBusiness from "../middlewares/isBusiness.middleware.js";

import {adminAnalytics, businessAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

// Business Analytics
router.get(
  "/business",
  auth,
  isBusiness,
  businessAnalytics
);

// Admin Analytics
router.get(
  "/admin",
  auth,
  isAdmin,
  adminAnalytics
);

export default router;