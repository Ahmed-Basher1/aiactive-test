module.exports = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.etherealMAIL,
      pass: process.env.etherealPassword
  }
  };