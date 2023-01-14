const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  username,
  email,
  otp,
}) => {

  const message = `<p>your otp is ${otp}</p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${username}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;