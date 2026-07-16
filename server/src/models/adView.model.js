import mongoose from "mongoose";

const adViewSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    ip: String,

    userAgent: String,
  },
  {
    timestamps: true,
  }
);

export const  AdView = mongoose.model("AdView", adViewSchema);