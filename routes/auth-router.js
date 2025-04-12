import express from "express"
import passport from "passport";
const router=express.Router();


// auth login 

router.get("/login",(req,res)=>{
         
    res.render("login")
})

router.get("/logout",(req,res)=>{

})


router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
    res.send(req.user);

})



router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    prompt:"select_account"
}));





export default router

