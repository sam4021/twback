require('../config/config');
var mailer = require('nodemailer');
var mailConfig = {
  host: CONFIG.mail_host,
  port: CONFIG.mail_port,
  auth: {
    user: CONFIG.mail_user,
    pass: CONFIG.mail_pass
  }
};

var transporter = mailer.createTransport(mailConfig);

module.exports = transporter;