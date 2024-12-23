import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
    unique: true,
  },
  topic: {
    type: String,
  },
  analytics: [
    {
      timestamp: { type: Date, default: Date.now },
      userAgent: String,
      ipAddress: String,
      geolocation: Object,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export { ShortUrl };
