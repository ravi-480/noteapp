const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const mongoose = require('mongoose');





passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos.value,
      };

      try {
        
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
            console.log(profile);
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

//loginroute
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/loginfail",
    successRedirect: "/dashboard",
  })
);

router.get("/loginfail", (req, res) => {
  res.send("something went wrong");
});

router.get("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            res.send("Error login out")
        }
        else{
            res.redirect('/')
        }
    })
})


// presist user data after successfull
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// retriev data
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

module.exports = router;
