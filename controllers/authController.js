const db = require('../db/config');
const User = db.User; // ? connect to  User Model
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  genterOTP,
  sendVerificationEmail,
  createJWT,
} = require('../utils');

// ?  add admin
const register = async (req, res) => {
  const { email, username, password } = req.body;
  const emailAlreadyExists = await User.findOne({ where: { email: email } });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const user = await User.create({
    username,
    email,
    password,
    role: 'admin',
    otp: genterOTP(),
  });
  await sendVerificationEmail({
    username: user.username,
    email: user.email,
    otp: user.otp,
  });
  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};
// ?  add user
const addUser = async (req, res) => {
  const { email, username, password } = req.body;
  const emailAlreadyExists = await User.findOne({ where: { email: email } });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const user = await User.create({
    username,
    email,
    password,
    role: 'user',
    otp: genterOTP(),
  });
  await sendVerificationEmail({
    username: user.username,
    email: user.email,
    otp: user.otp,
  });
  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};
// ? login for admin and user
// ? you should verify email before login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email');
  }

  const tokenUser = createTokenUser(user);
  let token = createJWT({ payload: tokenUser });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'you are successfully login', user, token });
};
// ? verify email with otp
const verifyEmail = async (req, res) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ where: { email: email } });

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
  addUser,
  login,
  verifyEmail,
};
