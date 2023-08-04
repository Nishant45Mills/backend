const { userService } = require("../services");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync")


const createUser = catchAsync(async (req, res) => {

    const user = await userService.createUser({ _org: req.user._org, ...req.body });

    res.status(201).json({ user });

});

const getUser = catchAsync(async (req, res) => {

    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    res.status(200).json({ user })

});

const getUsers = catchAsync(async (req, res) => {

    const users = await userService.getAllUser(req.user._org);

    res.status(200).json({ users });
});

const updateUserInfo = catchAsync(async (req, res) => {

    if (req.body.role) {

        throw new ApiError("use another endpoint to update userrole", 400)
    }

    const user = await userService.getUserById(req.params.userId);
    Object.assign(user, req.body);
    const result = await user.save()
    result.password = undefined;
    res.status(200).json({ result });
});

const updateUserRole = catchAsync(async (req, res) => {

    const user = await userService.getUserById(req.params.userRoleId);

    Object.assign(user, req.body);
    const result = await user.save()
    res.status(200).json({ result });
});

const updateOrg = catchAsync(async (req, res) => {

    const temp = req.user._org._id
    const user = await userService.updateOrgInfo(req.user._org._id, req.body);
    res.status(200).json({ user })

});

const deleteUser = catchAsync(async (req, res) => {

    const user = await userService.getUserById(req.params.userId);
    const result = await user.deleteOne();
    res.status(204).json({ result })
});

module.exports = { createUser, getUser, getUsers, updateUserInfo, updateUserRole, updateOrg, deleteUser }