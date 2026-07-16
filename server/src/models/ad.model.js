import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    // Business Owner
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Media
    mediaType: {
      type: String,
      enum: ["IMAGE", "VIDEO"],
      required: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    // Cloudinary Public ID
    publicId: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    // CTA
    ctaText: {
      type: String,
      enum: [
        "Visit Website",
        "Shop Now",
        "Learn More",
        "Download",
        "Contact Us",
      ],
      default: "Visit Website",
    },

    websiteUrl: {
      type: String,
      required: true,
    },

    // Feed / Video
    adType: {
      type: String,
      enum: ["FEED", "VIDEO"],
      required: true,
      index: true,
    },

    // Before / Middle / After
    videoPosition: {
      type: String,
      enum: ["BEFORE", "MIDDLE", "AFTER"],
      default: null,
    },

    // Schedule
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    // Admin Enable / Disable
    isActive: {
      type: Boolean,
      default: true,
    },

    // Analytics
    impressions: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    videoSkips: {
      type: Number,
      default: 0,
    },

    videoCompletes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index
adSchema.index({
  status: 1,
  adType: 1,
  isActive: 1,
});

export const Ad = mongoose.model("Ad", adSchema);