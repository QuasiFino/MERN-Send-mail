// regular expression from emailregex
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const emailStr = emails.replace(/,\s*$/, "");

  const invalidEmails = emailStr
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false)

  if(invalidEmails.length) {
    return `These emails are invalid ${invalidEmails}`;
  }
  return;
};
