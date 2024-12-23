import passport from "passport";
import { authenticateGoogleUser } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import { ApiResponse } from "../utils/ApiResponse.js";

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "api/v1/auth/login/failure",
  }),
  async (req, res) => {
    try {
      const { user, accessToken, refreshToken } = await authenticateGoogleUser(
        req.user
      );

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      return res
        .status(httpStatus.OK)
        .json(
          new ApiResponse(
            httpStatus.OK,
            { accessToken, refreshToken },
            "Authenticated successfully"
          )
        );
    } catch (err) {
      const apiError = new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Authentication failed",
        [err.message]
      );
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(apiError);
    }
  },
];

const googleFailure = (req, res) => {
  const apiError = new ApiError(
    httpStatus.UNAUTHORIZED,
    "Google authentication failed",
    ["Authentication with Google was not successful. Please try again."]
  );
  return res.status(httpStatus.UNAUTHORIZED).json(apiError);
};

export { googleLogin, googleCallback, googleFailure };
