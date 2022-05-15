const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
const passport = require('passport');
require('./models/User'); //should be above services/passport
require('./services/passport'); //nothing is exported in that file

const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
