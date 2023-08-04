const { userService, authTokenService, emailService } = require(".");
const userModel = require("../models/user.model");
const ApiError = require("../util/ApiError");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const loginUserWithEmailAndPassword = async (email, password) => {

  const user = await userService.findUserWithEmail(email);

  if (!user || !(await user.comaparePassword(password))) {

    throw new ApiError("Incorrect email or password", 400);
  }

  return await user.populate('_org', 'companyName email');
}

const forgotPasswordService = async (email) => {

  console.log(email);
  const user = await userService.findUserWithEmail(email);

  if (!user) {

    throw new ApiError('you enter wrong email', 400);

  }

  const generateResetToken = await authTokenService.authToken(user);

  const transporter = nodemailer.createTransport({

    host: 'smtp.ethereal.email',
    port: 587,
    auth: {

      user: 'kyle.gaylord@ethereal.email',
      pass: 'VqxQ7XrWZyK75AYQRM'
    }
  })

  const options = {

    from: '<admin@gmail.com>',
    to: user.email,
    subject: `forgot the password`,
    html: 'hii ' + user.name + ',please click this link for new password <a href="http://localhost:4200/auth/reset-password?token=' + generateResetToken + '">reset password</a>'

  }

   return transporter.sendMail(options);

}

const resetPasswordService = async (token,tokenType, newPassword) => {

  console.log(tokenType);

  if (tokenType == 'reset-password') {

    const tokenStatus = await authTokenService.verfyToken(token);

   const user = await userModel.findById(tokenStatus._id).select('+password');

   const password = await bcrypt.hash(newPassword,10);

    user.password = password;

    await user.save();

    return user;

  }

}

module.exports = { loginUserWithEmailAndPassword, forgotPasswordService, resetPasswordService }