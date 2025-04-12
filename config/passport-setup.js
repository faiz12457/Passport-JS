import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user-model.js";

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  }).catch(err => done(err, null));
});

// Configure Google Strategy
passport.use(new GoogleStrategy({
  callbackURL: "/auth/google/redirect",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let currUser = await User.findOne({ googleId: profile.id });

    if (currUser) {
      return done(null, currUser);
    }

    // Create new user if doesn't exist
    const newUser = new User({
      username: profile.displayName,
      googleId: profile.id,
      email: profile.emails[0].value
    });

    await newUser.save();
    return done(null, newUser);

  } catch (err) {
    return done(err, null);
  }
}));
