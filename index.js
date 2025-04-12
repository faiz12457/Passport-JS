import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth-router.js";
import  "./config/passport-setup.js"
import db from "./config/mongodb-connection.js"
import session from "express-session";

import passport from "passport";
const app=express();
const port=3000;

app.set("view engine","ejs");



app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000  // 1 day
    }
  }));


app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",authRouter)
app.get("/",(req,res)=>{
    res.render("home")
})


app.listen(port,()=>{
    console.log('Server is running on port '+port)
})