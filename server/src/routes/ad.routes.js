import express from "express";
import auth from "../middlewares/auth.middleware.js";
import isBusiness from "../middlewares/isBusiness.middleware.js";
import { upload } from "../multer/mutler.js";
import { approveAd, createAd, deleteAd, getAllAds, getFeedAd, getMyAds, getSingleAd, getVideoAd, rejectAd, updateAd } from "../controllers/ad.controller.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

// Create Advertisement
router.post("/create", auth, isBusiness, upload.single("media"), createAd);

// Get My Advertisements
router.get("/my-ads", auth, isBusiness, getMyAds);

// Update Advertisement
router.put("/update/:id", auth, isBusiness, upload.single("media"), updateAd);

// Delete Advertisement
router.delete("/delete/:id",auth, isBusiness, deleteAd);

// Admin
router.get("/all", auth, isAdmin, getAllAds);

router.get("/:id", auth, getSingleAd);

router.patch("/:id/approve", auth, isAdmin, approveAd);

router.patch("/:id/reject", auth, isAdmin, rejectAd);

// Public
router.get("/feed/ad", getFeedAd);

router.get("/video/ad", getVideoAd);

export default router;