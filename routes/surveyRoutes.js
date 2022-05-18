const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

  app.get('/api/surveys', requireLogin, async(req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send("Thanks for Voting!!");
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL(url).pathname);// returns { surveyId: '626fa983d934bf87de6a82d6', choice: 'yes' }
        if(match) {
          return {email, surveyId: match.surveyId, choice: match.choice}
        }
      })
      .compact() //removing undefined vals
      .uniqBy('email', 'surveyId')
      .each(({surveyId, email, choice}) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    // console.log(req.body); //while testing sendgrid integration

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async(req, res) => {
    const { title, subject, body, recipients } = req.body;
    const recip = recipients.split(",").filter(recipient => { return /\S/.test(recipient) });

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recip.map(email => ({ email: email.trim() })),
      _user: req.user._id,
      dateSent: Date.now()
    });
    console.log("RECIPIENTS: ", survey.recipients);
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = req.user.save();

      res.send(user);
    } catch(err) {
      res.status(422).send(err); //422- unproccessible entity
    }
  });
};
