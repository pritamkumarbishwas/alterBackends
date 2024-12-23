import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.id) {
          return done(new Error("Google profile ID is missing"), null);
        }


        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email =
            profile?.emails && profile?.emails.length > 0
              ? profile?.emails[0]?.value
              : "No email provided";
          const avatar =
            profile?.photos && profile?.photos.length > 0
              ? profile?.photos[0]?.value
              : "";

          if (!email) {
            return done(new Error("No email returned from Google"), null);
          }

          user = new User({
            googleId: profile?.id,
            name: profile?.displayName || "No Name",
            email: email,
            avatar: avatar,
          });

          await user.save();
        }

        return done(null, user); // Calling done with user
      } catch (err) {
        console.error("Google strategy error:", err);

        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
