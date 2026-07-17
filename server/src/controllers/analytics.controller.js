import { Ad } from "../models/ad.model.js";

// ======================================
// Business Analytics
// ======================================
export const businessAnalytics = async (req, res) => {
  try {
    const businessId = req.user._id;

    const ads = await Ad.find({ business: businessId });

    const analytics = {
      totalAds: ads.length,

      totalImpressions: ads.reduce(
        (total, ad) => total + (ad.impressions || 0),
        0
      ),

      totalClicks: ads.reduce(
        (total, ad) => total + (ad.clicks || 0),
        0
      ),

      totalVideoSkips: ads.reduce(
        (total, ad) => total + (ad.videoSkips || 0),
        0
      ),

      totalVideoCompletes: ads.reduce(
        (total, ad) => total + (ad.videoCompletes || 0),
        0
      ),
    };

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Admin Analytics
// ======================================
export const adminAnalytics = async (req, res) => {
  try {
    const ads = await Ad.find();

    const analytics = {
      totalAds: ads.length,

      activeAds: ads.filter(
        (ad) => ad.status === "APPROVED"
      ).length,

      pendingAds: ads.filter(
        (ad) => ad.status === "PENDING"
      ).length,

      rejectedAds: ads.filter(
        (ad) => ad.status === "REJECTED"
      ).length,

      totalImpressions: ads.reduce(
        (total, ad) => total + (ad.impressions || 0),
        0
      ),

      totalClicks: ads.reduce(
        (total, ad) => total + (ad.clicks || 0),
        0
      ),

      totalVideoSkips: ads.reduce(
        (total, ad) => total + (ad.videoSkips || 0),
        0
      ),

      totalVideoCompletes: ads.reduce(
        (total, ad) => total + (ad.videoCompletes || 0),
        0
      ),
    };

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};