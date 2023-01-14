const db = require("../db/config");
const User = db.User;
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  chechPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.findAll({ where: { role: 'user'},attributes: {exclude: ['password']}, });
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id} ,attributes: {exclude: ['password']}});
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  chechPermissions(req.user, user.id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ where: { id: req.user.userId},attributes: {exclude: ['password']} });

  user.email = email;
  user.username = username;

  await user.save();

  res.status(StatusCodes.OK).json({ msg : " update user successfully ",user: user });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ where: { id: req.user.userId}});
  const isPasswordCorrect = await bcrypt.compare(oldPassword,user.password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

