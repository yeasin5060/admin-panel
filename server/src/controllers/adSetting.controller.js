import { AdSetting } from "../models/adSetting.model.js";

// Get Settings
export const getSettings = async (req, res) => {
  try {
    let settings = await AdSetting.findOne();

    if (!settings) {
      settings = await AdSetting.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await AdSetting.findOne();

    if (!settings) {
      settings = await AdSetting.create(req.body);
    } else {
      settings = await AdSetting.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};