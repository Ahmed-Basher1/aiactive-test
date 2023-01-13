const otpGenerator = require('otp-generator')

const genterOTP = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  };



module.exports = genterOTP;
