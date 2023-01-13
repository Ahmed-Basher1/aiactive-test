const db = require("../db/config");
const User = db.User;
const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');
// const {
//   createTokenUser,
//   genterOTP,
//   sendVerificationEmail,
//   createJWT,
// } = require('../utils');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    // const emailAlreadyExists = await User.findOne({ email });
    // if (emailAlreadyExists) {
    //   throw new CustomError.BadRequestError('Email already exists');
    // }
  
    // first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0;
    // const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({
      name,
      email,
      password,
    });
    // await sendVerificationEmail({
    //   name: user.name,
    //   email: user.email,
    //   otp: user.otp,
    // });
    // send verification token back only while testing in postman!!!
    res.status(StatusCodes.CREATED).json({
      msg: 'Success! Please check your email to verify account',user
    });
  };


  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
  
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    if (!user.isVerified) {
      throw new CustomError.UnauthenticatedError('Please verify your email');
    }
  
      const tokenUser = createTokenUser(user);
      let token =  createJWT({ payload:tokenUser });

    
    res.status(StatusCodes.OK).json({ msg: 'you are successfully login',user,token });

  };

  const verifyEmail = async (req, res) => {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new CustomError.UnauthenticatedError('Verification Failed');
    }
  
    if (user.otp !== otp) {
      throw new CustomError.UnauthenticatedError('Verification Failed');
    }
  
    (user.isVerified = true), (user.verified = Date.now());
    user.otp = '';
  
    await user.save();
  
    res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
  };


module.exports = {
    register,
    login,
    verifyEmail
}