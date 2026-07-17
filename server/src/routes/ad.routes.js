import express from "express";

import {
  createAd,
  updateAd,
  deleteAd,
  getMyAds,
  getFeedAd,
  getVideoAd,
  recordImpression,
  recordClick,
  recordVideoComplete,
} from "../controllers/ad.controller.js";

import auth from "../middlewares/auth.middleware.js";
import isBusiness from "../middlewares/isBusiness.middleware.js";
import { upload } from "../multer/mutler.js";

const router = express.Router();

/* ==========================================================
   Business Routes
========================================================== */

// Create Advertisement
router.post(
  "/create",
  auth,
  isBusiness,
  upload.single("media"),
  createAd
);

// Get My Advertisements
router.get("/my-ads",auth,isBusiness,getMyAds);

// Update Advertisement
router.put(
  "/update/:id",
  auth,
  isBusiness,
  upload.single("media"),
  updateAd
);

// Delete Advertisement
router.delete(
  "/delete/:id",
  auth,
  isBusiness,
  deleteAd
);

/* ==========================================================
   Public Advertisement Routes
========================================================== */

// Get Feed Advertisement
router.get(
  "/feed",
  getFeedAd
);

// Get Video Advertisement
// Example:
// /api/ads/video?position=BEFORE
// /api/ads/video?position=MIDDLE
// /api/ads/video?position=AFTER
router.get(
  "/video",
  getVideoAd
);

/* ==========================================================
   Tracking Routes
========================================================== */

// Record Impression
router.post(
  "/:adId/impression",
  recordImpression
);

// Record Click
router.post(
  "/:adId/click",
  recordClick
);

// Record Video Complete
router.post(
  "/:adId/video-complete",
  recordVideoComplete
);

export default router;