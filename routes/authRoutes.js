const passport = require('passport');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });
  
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] //getting profile detail
  }));
  
  app.get('/auth/google/callback', passport.authenticate('google'));
}
