const { user, organization } = require('../models');

const createOrg = async (orgBody) => {

    return organization.create(orgBody);

}

const createUser = async (userBody) => {

    return user.create(userBody);

}

const findUserWithEmail = async (email) => {

    return user.findOne({ email }).select('+password')

}

const getAllUser = (orgId) => {

    return user.find({ _org: orgId }).populate('_org', 'companyName email');
}

const getUserById = async (userRoleId) => {

    return user.findById(userRoleId).populate('_org', 'companyName email');
}

const updateOrgInfo = async (orgId, updateBody) => {

    const org = await organization.findById(orgId);
    Object.assign(org, updateBody);
    await org.save();
    return org;

}


module.exports = { createOrg, createUser, findUserWithEmail, getAllUser, getUserById, updateOrgInfo }