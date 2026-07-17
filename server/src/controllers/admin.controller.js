import { Ad } from "../models/ad.model.js";

// ============================
// Admin Dashboard
// ============================
export const dashboard = async (req, res) => {
  try {
    const totalAds = await Ad.countDocuments();

    const pendingAds = await Ad.countDocuments({
      status: "PENDING",
    });

    const approvedAds = await Ad.countDocuments({
      status: "APPROVED",
    });

    const rejectedAds = await Ad.countDocuments({
      status: "REJECTED",
    });

    const ads = await Ad.find();

    const totalImpressions = ads.reduce(
      (sum, ad) => sum + ad.impressions,
      0
    );

    const totalClicks = ads.reduce(
      (sum, ad) => sum + ad.clicks,
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalAds,
        pendingAds,
        approvedAds,
        rejectedAds,
        totalImpressions,
        totalClicks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Pending Ads
// ============================
export const getPendingAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      status: "PENDING",
    })
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

// ============================
// Approved Ads
// ============================
export const getApprovedAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      status: "APPROVED",
    })
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

// ============================
// Rejected Ads
// ============================
export const getRejectedAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      status: "REJECTED",
    })
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

// ============================
// Approve Advertisement
// ============================
export const approveAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    ad.status = "APPROVED";
    await ad.save();

    res.status(200).json({
      success: true,
      message: "Advertisement approved successfully.",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Reject Advertisement
// ============================
export const rejectAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    ad.status = "REJECTED";

    await ad.save();

    res.status(200).json({
      success: true,
      message: "Advertisement rejected successfully.",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Delete Advertisement
// ============================
export const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    await ad.deleteOne();

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