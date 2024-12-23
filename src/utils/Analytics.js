import { redisClient } from "./Redis.js";
import { ShortUrl } from "../models/shorturl.model.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAnalyticsData = async (shortUrl) => {
  const cachedData = await redisClient.get(`analytics:${shortUrl}`);

  if (cachedData) {
    return new ApiResponse(
      httpStatus.OK,
      JSON.parse(cachedData),
      "Analytics fetched from cache"
    );
  }

  try {
    const urlData = await ShortUrl.findOne({ alias: shortUrl });
    if (!urlData) {
      throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found");
    }

    const analyticsData = {
      totalClicks: 100,
      uniqueClicks: 80,
      clicksByDate: [{ date: "2024-12-21", clicks: 50 }],
      osType: [
        { osName: "Windows", uniqueClicks: 30, uniqueUsers: 25 },
        { osName: "MacOS", uniqueClicks: 20, uniqueUsers: 15 },
      ],
      deviceType: [
        { deviceName: "Desktop", uniqueClicks: 60, uniqueUsers: 50 },
        { deviceName: "Mobile", uniqueClicks: 40, uniqueUsers: 30 },
      ],
    };

    await redisClient.setex(
      `analytics:${shortUrl}`,
      3600,
      JSON.stringify(analyticsData)
    );

    return new ApiResponse(
      httpStatus.OK,
      analyticsData,
      "Analytics data fetched successfully"
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching analytics data",
      [error.message]
    );
  }
};

export { getAnalyticsData };
