import cloudinary from "../config/cloudinary.js";
import { Ad } from "../models/ad.model.js";

// =======================
// Create Advertisement
// =======================
export const createAd = async (req, res) => {
  try {
    const {
      title,
      description,
      mediaType,
      ctaText,
      websiteUrl,
      adType,
      videoPosition,
      startDate,
      endDate,
    } = req.body;

    if (
      !title ||
      !mediaType ||
      !websiteUrl ||
      !adType ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Media file is required.",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "advertisements",
      resource_type: "auto", // image or video
    });

    const ad = await Ad.create({
      business: req.user._id,
      title,
      description,
      mediaType,
      mediaUrl: result.secure_url,
      thumbnail: result.secure_url,
      ctaText,
      websiteUrl,
      adType,
      videoPosition,
      startDate,
      endDate,
    });

    res.status(201).json({
      success: true,
      message: "Advertisement created successfully.",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};