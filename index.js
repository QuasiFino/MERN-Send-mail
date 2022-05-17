const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const passport = require('passport');
require('./models/User'); //should be above services/passport
require('./services/passport'); //nothing is exported in that file

const app = express();

app.use(bodyParser.json()); //to receive req obj from client in json format

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  //to get client side routes - Express will serve up production assets
  // like main.js or main.css from client/build
  app.use(express.static('client/build'));
  // Express will serve the index.html file, if it does not recongnize the route
  app.use('*', express.static('client/build'));
}

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
