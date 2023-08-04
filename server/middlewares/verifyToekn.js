const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const ApiError = require('../util/ApiError');

const verifyToken = async (req, res, next) => {

    let authToken = req.headers.authorization;
    let tokenInfo = authToken.split(' ');
    let tokenType = tokenInfo[0];
    let token = tokenInfo[1];

    jwt.verify(token, 'Nishant@123', async (err, decode) => {

        if (err) {

            //handle the error
            throw new ApiError('Unautharized error', 401);
        }

        const userId = decode['_id'];

        const user = await userModel.findById(userId).select('+password').populate('_org','companyName email')
        req.user = user

        next();
    })

}

module.exports = verifyToken;