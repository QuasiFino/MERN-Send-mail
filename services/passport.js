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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if(existingUser) {
            console.log('existing User');
            done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
            .save()
            .then((user => done(null, user)));
          }
        });
    }
  )
);

// Ok for those who may encounter this issue. The fix is actually fairly simple. Mobile browsers dont understand this GoogleStrategy set up below: \
// You will have to do something like this

//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             callbackURL: keys.redirectURI + '/auth/google/callback',
