import express from "express";
import auth from "../middlewares/auth.middleware.js";
import isBusiness from "../middlewares/isBusiness.middleware.js";
import { upload } from "../multer/mutler.js";
import { createAd, deleteAd, getMyAds, updateAd } from "../controllers/ad.controller.js";

const router = express.Router();

// Create Advertisement
router.post("/create", auth, isBusiness, upload.single("media"), createAd);

// Get My Advertisements
router.get("/my-ads", auth, isBusiness, getMyAds);

// Update Advertisement
router.put("/update/:id", auth, isBusiness, upload.single("media"), updateAd);

// Delete Advertisement
router.delete("/delete/:id",auth, isBusiness, deleteAd);

export default router;