import mongoose from "mongoose";

const adEventSchema = new mongoose.Schema(
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

    event: {
      type: String,
      enum: ["VIDEO_SKIP", "VIDEO_COMPLETE"],
      required: true,
    },

    ip: String,

    userAgent: String,
  },
  {
    timestamps: true,
  }
);

export const AdEvent = mongoose.model("AdEvent", adEventSchema);