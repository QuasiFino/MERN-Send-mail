const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// to create cookie done automatically by passport due to initialize in index.js
passport.serializeUser((user, done) => {
  done(null, user.id); //id created by mongo on user creation
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true //to support https request from heroku
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      if(existingUser) {
        console.log("Existing User");
        return done(null, existingUser);
      }
      // create new User instance
      const user = await new User({ googleId: profile.id }).save()
      done(null, user);
    }
  )
);

// Ok for those who may encounter this issue. The fix is actually fairly simple. Mobile browsers dont understand this GoogleStrategy set up below: \
// You will have to do something like this

//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             callbackURL: keys.redirectURI + '/auth/google/callback',
