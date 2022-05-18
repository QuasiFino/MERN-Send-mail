const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
  constructor({subject, recipients}, content) {
    sgMail.setApiKey(keys.sendGridKey);

    this.to = this.formatAddresses(recipients);
    this.from = "aajlak.wink@gmail.com";
    this.subject = subject;
    this.text = "Testing with send grid";
    this.html = content;
  }

  formatAddresses(recipients) {
    return recipients.map(({email}) => { return email });
  }

  async send() {
    const msg = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.text,
      html: this.html
    }
    const response = await sgMail.sendMultiple(msg);
    return response;
  }
}

module.exports = Mailer;
