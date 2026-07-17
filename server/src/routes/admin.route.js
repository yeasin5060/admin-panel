import express from "express";

import auth from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

import { dashboard, getPendingAds, getApprovedAds, getRejectedAds, approveAd, rejectAd, deleteAd} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", auth, isAdmin, dashboard);

router.get("/pending-ads", auth, isAdmin, getPendingAds);

router.get("/approved-ads", auth, isAdmin, getApprovedAds);

router.get("/rejected-ads", auth, isAdmin, getRejectedAds);

router.patch("/approve/:id", auth, isAdmin, approveAd);

router.patch("/reject/:id", auth, isAdmin, rejectAd);

router.delete("/delete/:id", auth, isAdmin, deleteAd);

export default router;