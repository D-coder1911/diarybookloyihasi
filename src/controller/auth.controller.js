const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const sendMail = require('../utils/sendMail');

exports.getLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.render('auth/login', { error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.render('auth/login', { error: 'Incorrect password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/profile');
};

exports.getRegister = (req, res) => {
  res.render('auth/register', { error: null });
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });
  res.redirect('/login');
};

exports.getForgotPassword = (req, res) => {
  res.render('auth/forgot-password', { message: null, error: null });
};

exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render('auth/forgot-password', { error: 'Email not found' });

  const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '15m' });
  const link = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
  await sendMail(email, 'Reset Your Password', `Click here: ${link}`);

  res.render('auth/forgot-password', { message: 'Reset link sent!', error: null });
};

exports.getResetPassword = (req, res) => {
  res.render('auth/reset-password', { token: req.params.token, error: null });
};

exports.postResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    res.redirect('/login');
  } catch {
    res.render('auth/reset-password', { token, error: 'Invalid or expired token' });
  }
};
