import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";
import {
  getUrlAnalytics,
  getTopicAnalytics,
  getOverallAnalytics,
} from "../services/analytics.service.js";

const urlAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;
    const analytics = await getUrlAnalytics(alias);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          "Analytics retrieved successfully",
          analytics
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const topicAnalytics = async (req, res) => {
  try {
    const { topic } = req.params;
    const analytics = await getTopicAnalytics(topic);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          "Analytics retrieved successfully",
          analytics
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const overallAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const analytics = await getOverallAnalytics(userId);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          "Analytics retrieved successfully",
          analytics
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export { urlAnalytics, topicAnalytics, overallAnalytics };
