const { createJWT, isTokenValid } = require('./jwt');
const createTokenUser = require('./createToken');
const sendVerificationEmail = require('./sendVerficationEmail');
const genterOTP = require('./otpGenerator');
const chechPermissions = require('./checkPermissions');

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  sendVerificationEmail,
  genterOTP,
  chechPermissions
};