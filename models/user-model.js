import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

export const User = model("User", UserSchema);
