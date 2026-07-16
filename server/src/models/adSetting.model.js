import mongoose from "mongoose";

const adSettingSchema = new mongoose.Schema(
  {
    feedAdInterval: {
      type: Number,
      default: 5,
    },

    videoPosition: {
      type: String,
      enum: ["BEFORE", "MIDDLE", "AFTER"],
      default: "BEFORE",
    },

    videoDelay: {
      type: Number,
      default: 5,
    },

    skipButtonDelay: {
      type: Number,
      default: 3,
    },

    adEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AdSetting = mongoose.model(
  "AdSetting",
  adSettingSchema
);