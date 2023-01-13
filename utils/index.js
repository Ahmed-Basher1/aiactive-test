const { createJWT, isTokenValid } = require('./jwt');
const createTokenUser = require('./createToken');
const sendVerificationEmail = require('./sendVerficationEmail');
const genterOTP = require('./otpGenerator');

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  sendVerificationEmail,
  genterOTP
};