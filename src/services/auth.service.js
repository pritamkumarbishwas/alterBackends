import { User } from "../models/user.model.js";
import { generateUserAccessAndRefreshTokens } from "../utils/tokenUtils.js";

const authenticateGoogleUser = async (data) => {
  let user = await User.findOneAndUpdate(
    { googleId: data.googleId },
    {
      name: data.displayName,
      email: data.emails,
      avatar: data.photos,
    },
    { new: true, upsert: true }
  );

  console.log("data", user);
  const { accessToken, refreshToken } =
    await generateUserAccessAndRefreshTokens(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export { authenticateGoogleUser };
