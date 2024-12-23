import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import httpStatus from "http-status";

// Generate access and refresh tokens for a given user ID
const generateUserAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while generating tokens"
    );
  }
};

export { generateUserAccessAndRefreshTokens };
