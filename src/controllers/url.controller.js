import {
  createShortUrlService,
  redirectShortUrlService,
} from "../services/shortUrl.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";

const baseUrl = process.env.BASE_URL;

const createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const userId = req.user.id;

    const result = await createShortUrlService(
      longUrl,
      customAlias,
      topic,
      userId
    );

    return res.status(httpStatus.CREATED).json(
      new ApiResponse(httpStatus.CREATED, "Short URL created successfully", {
        shortUrl: `${baseUrl}/${result.shortUrl}`,
        createdAt: result.createdAt,
      })
    );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

const redirectShortUrl = async (req, res) => {
  try {
    const { alias } = req.params;
    const redirectUrl = await redirectShortUrlService(alias, req);

    return res.redirect(redirectUrl);
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

export { createShortUrl, redirectShortUrl };
