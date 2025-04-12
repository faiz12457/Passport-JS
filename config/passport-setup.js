import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import googleStrategy from "passport-google-oauth20";
import { User } from "../models/user-model.js";

export default passport.use(new googleStrategy({
    callbackURL:"/auth/google/redirect",
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET

},async(accessToken,refreshToken,profile,done)=>{
    
  const currUser =await User.findOne({username:profile.displayName});
  if(currUser){
      
  }
  else{
  const newUser=new User({
    username:profile.displayName,
    googleId:profile.id,
    email:profile.emails[0].value,
  })

  await newUser.save();

}
}));
