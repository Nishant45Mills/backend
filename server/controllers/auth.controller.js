const catchAsync = require('../util/catchAsync');
const { userService, authTokenService, authService, emailService } = require('../services');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { findUserWithEmail } = require('../services/user.service');
const ApiError = require('../util/ApiError');
const { object } = require('joi');

const register = catchAsync(async (req, res, next) => {

    let userExist = await userModel.findOne({ email: req.body.email });

    if (userExist) {

        next(new ApiError("User already exist", 409));

    }

    const org = await userService.createOrg(req.body);
    let user;
    req.body.password = await bcrypt.hash(req.body.password, 10);;
    user = await userService.createUser({

        _org: org._id,
        ...req.body
    })

    user = await user.populate('_org', 'companyName email');
    const token = await authTokenService.authToken(user);
    user.password = undefined
    res.status(201).send({ user, token });

})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    user.password = undefined;
    const userToken = await authTokenService.authToken(user);
    res.json({ user, userToken });
})

const changePassword = catchAsync(async (req, res) => {

    const user1 = await userService.findUserWithEmail(req.user.email);
    const status = await bcrypt.compare(req.body.old_password, user1.password)

    if (!status) {

        throw new ApiError('enter crrect password', 400);
    }

    const password = await bcrypt.hash(req.body.new_password, 10);

    user1.password = password;
    const user = await user1.save();
    user.password = undefined;
    res.json({ user })

})

const forgotPassword = catchAsync(async (req, res) => {

    const mail = await authService.forgotPasswordService(req.body.email);

    res.json({ message: "check your eathereal mailBox" });

})

const resetPassword = catchAsync(async (req, res) => {

    const user = await authService.resetPasswordService(req.query.token, 'reset-password', req.body.newPassword);

    user.password = undefined;

    res.json({ user })

})

const verifyEmail = catchAsync(async (req, res) => {

    const token = await authTokenService.authToken(req.user);
    const to = req.user.email;

    const mail = await emailService.sendVerifyMail(to, token);
    res.json({ message: "check ethermail for email verification" })


});

const verifyAccount = catchAsync(async (req, res) => {

    const tokenStatus = await authTokenService.verfyToken(req.query.token);
    const user = await userService.getUserById(tokenStatus._id);
    user.isEmailVerfified = true;
    await user.save();
    res.json({ user });

})


module.exports = { register, login, changePassword, forgotPassword, resetPassword, verifyEmail, verifyAccount }