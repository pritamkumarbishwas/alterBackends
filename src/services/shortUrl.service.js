import crypto from "crypto";
import { ShortUrl } from "../models/shorturl.model.js";
import { redisClient } from "../utils/Redis.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";

const createShortUrlService = async (longUrl, customAlias, topic,userId) => {
  if (!longUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Long URL is required.");
  }

  const shortUrl = customAlias || crypto.randomBytes(4).toString("hex");

  const existingAlias = await ShortUrl.findOne({
    $or: [{ shortUrl }, { customAlias }],
  });

  if (existingAlias) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Custom alias already in use.");
  }

  const newShortUrl = new ShortUrl({
    longUrl,
    shortUrl,
    customAlias,
    topic,
    userId
  });

  await newShortUrl.save();
  await redisClient.set(shortUrl, longUrl, "EX", 60 * 60 * 24);

  return newShortUrl;
};

const redirectShortUrlService = async (alias, req) => {
  const cachedUrl = await redisClient.get(alias);

  if (cachedUrl) {
    return cachedUrl;
  }

  const shortUrlData = await ShortUrl.findOne({
    $or: [{ shortUrl: alias }, { customAlias: alias }],
  });

  if (!shortUrlData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found.");
  }

  shortUrlData.analytics.push({
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
    geolocation: {},
  });

  await shortUrlData.save();
  await redisClient.set(alias, shortUrlData.longUrl, "EX", 60 * 60 * 24);

  return shortUrlData.longUrl;
};

export { createShortUrlService, redirectShortUrlService };
