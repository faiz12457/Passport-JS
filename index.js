import express from "express";
import authRouter from "./routes/auth-router.js";
import passportSetup from "./config/passport-setup.js"
import db from "./config/mongodb-connection.js"

const app=express();
const port=3000;

app.set("view engine","ejs");
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.render("home")
})


app.listen(port,()=>{
    console.log('Server is running on port '+port)
})