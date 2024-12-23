import { ShortUrl } from "../models/shorturl.model.js";
import { ApiError } from "../utils/ApiError.js";
import { UAParser } from "ua-parser-js";

import {
  getOsType,
  getDeviceType,
  getClicksByDate,
} from "../utils/analyticsUtils.js";

const extractOS = (userAgent) => {
  const parser = new UAParser(userAgent);
  return parser.getOS().name || "Unknown";
};

const generateClicksByDate = (analytics) => {
  return analytics.reduce((map, { timestamp }) => {
    const date = new Date(timestamp).toISOString().split("T")[0];
    map.set(date, (map.get(date) || 0) + 1);
    return map;
  }, new Map());
};

const getUrlAnalytics = async (alias) => {
  const url = await ShortUrl.findOne({ customAlias: alias });

  if (!url) {
    throw new ApiError(404, "Short URL not found.");
  }

  const analyticsData = url.analytics;

  const totalClicks = analyticsData.length;

  const uniqueClicks = new Set(analyticsData.map(({ ipAddress }) => ipAddress))
    .size;

  const clicksByDate = Object.entries(getClicksByDate(analyticsData)).map(
    ([date, clicks]) => ({ date, clicks })
  );

  const osTypeMap = analyticsData.reduce((acc, { userAgent, ipAddress }) => {
    const osName = getOsType(userAgent);
    if (!acc[osName]) {
      acc[osName] = { uniqueClicks: 0, uniqueUsers: new Set() };
    }
    acc[osName].uniqueClicks += 1;
    acc[osName].uniqueUsers.add(ipAddress);
    return acc;
  }, {});

  const osType = Object.entries(osTypeMap).map(
    ([osName, { uniqueClicks, uniqueUsers }]) => ({
      osName,
      uniqueClicks,
      uniqueUsers: uniqueUsers.size,
    })
  );

  const deviceTypeMap = analyticsData.reduce(
    (acc, { userAgent, ipAddress }) => {
      const deviceName = getDeviceType(userAgent);
      if (!acc[deviceName]) {
        acc[deviceName] = { uniqueClicks: 0, uniqueUsers: new Set() };
      }
      acc[deviceName].uniqueClicks += 1;
      acc[deviceName].uniqueUsers.add(ipAddress);
      return acc;
    },
    {}
  );

  const deviceType = Object.entries(deviceTypeMap).map(
    ([deviceName, { uniqueClicks, uniqueUsers }]) => ({
      deviceName,
      uniqueClicks,
      uniqueUsers: uniqueUsers.size,
    })
  );

  return {
    totalClicks,
    uniqueClicks,
    clicksByDate,
    osType,
    deviceType,
  };
};

const getTopicAnalytics = async (topic) => {
  const urls = await ShortUrl.find({ topic });

  if (!urls || urls.length === 0) {
    throw new Error("No URLs found for the topic.");
  }

  const analyticsData = urls.map((url) => {
    const totalClicks = url.analytics.length;
    const uniqueUsers = new Set(url.analytics.map((data) => data.ipAddress))
      .size;

    const clicksByDate = Array.from(
      generateClicksByDate(url.analytics),
      ([date, clicks]) => ({ date, clicks })
    );

    return {
      shortUrl: url.longUrl,
      totalClicks,
      uniqueClicks: uniqueUsers,
      clicksByDate,
    };
  });

  const totalClicks = analyticsData.reduce(
    (acc, data) => acc + data.totalClicks,
    0
  );
  const uniqueClicks = analyticsData.reduce(
    (acc, data) => acc + data.uniqueClicks,
    0
  );

  return {
    totalClicks,
    uniqueClicks,
    clicksByDate: analyticsData.flatMap((data) => data.clicksByDate),
    urls: analyticsData,
  };
};

const getOverallAnalytics = async (userId) => {
  const urls = await ShortUrl.find({ userId });

  if (!urls || urls.length === 0) {
    throw new ApiError(404, "No short URLs found for the user.");
  }

  const analyticsData = urls.flatMap((url) => url.analytics);

  const totalUrls = urls.length;

  const totalClicks = analyticsData.length;

  const uniqueClicks = new Set(analyticsData.map(({ ipAddress }) => ipAddress))
    .size;

  const clicksByDate = Object.entries(getClicksByDate(analyticsData)).map(
    ([date, clicks]) => ({ date, clicks })
  );

  const osTypeMap = analyticsData.reduce((acc, { userAgent, ipAddress }) => {
    const osName = getOsType(userAgent);
    if (!acc[osName]) {
      acc[osName] = { uniqueClicks: 0, uniqueUsers: new Set() };
    }
    acc[osName].uniqueClicks += 1;
    acc[osName].uniqueUsers.add(ipAddress);
    return acc;
  }, {});

  const osType = Object.entries(osTypeMap).map(
    ([osName, { uniqueClicks, uniqueUsers }]) => ({
      osName,
      uniqueClicks,
      uniqueUsers: uniqueUsers.size,
    })
  );

  const deviceTypeMap = analyticsData.reduce(
    (acc, { userAgent, ipAddress }) => {
      const deviceName = getDeviceType(userAgent);
      if (!acc[deviceName]) {
        acc[deviceName] = { uniqueClicks: 0, uniqueUsers: new Set() };
      }
      acc[deviceName].uniqueClicks += 1;
      acc[deviceName].uniqueUsers.add(ipAddress);
      return acc;
    },
    {}
  );

  const deviceType = Object.entries(deviceTypeMap).map(
    ([deviceName, { uniqueClicks, uniqueUsers }]) => ({
      deviceName,
      uniqueClicks,
      uniqueUsers: uniqueUsers.size,
    })
  );

  return {
    totalUrls,
    totalClicks,
    uniqueClicks,
    clicksByDate,
    osType,
    deviceType,
  };
};

export { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics };
