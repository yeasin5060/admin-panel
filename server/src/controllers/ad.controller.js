import cloudinary from "../config/cloudinary.js";
import { Ad } from "../models/ad.model.js";
import fs from 'fs'

// =======================
// Create Advertisement
// =======================
export const createAd = async (req, res) => {
  try {
    const {title, description, mediaType, ctaText, websiteUrl, adType, videoPosition, startDate, endDate} = req.body;

    if (!title || !mediaType || !websiteUrl || !adType || !startDate || !endDate) {
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

// =======================
// Update Advertisement
// =======================

export const updateAd = async (req, res) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    // Only Owner Can Update
    if (ad.business.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const updateData = { ...req.body };

    // If New Media Uploaded
    if (req.file) {
      // Delete Old Media From Cloudinary
      if (ad.public_id) {
        await cloudinary.uploader.destroy(ad.public_id, {
          resource_type: "auto",
        });
      }

      // Upload New Media
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "advertisements",
        resource_type: "auto",
      });

      updateData.mediaUrl = result.secure_url;
      updateData.public_id = result.public_id;

      // Delete Local File
      fs.unlinkSync(req.file.path);
    }

    const updatedAd = await Ad.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Advertisement updated successfully.",
      ad: updatedAd,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Advertisement
// =======================
export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    if (ad.business.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await Ad.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Advertisement deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get My Advertisements
// =======================
export const getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      business: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: ads.length,
      ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// Get All Advertisements
// =======================
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find()
      .populate("business", "name email companyName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: ads.length,
      ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get single Advertisements
// =======================
export const getSingleAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate(
      "business",
      "name email companyName"
    );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    res.status(200).json({
      success: true,
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};