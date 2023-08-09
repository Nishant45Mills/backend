const jwt = require('jsonwebtoken');

const authToken = async (user) => {

    return jwt.sign({ _id: user._id }, 'Nishant@123', { expiresIn: '30d' });

}

const verfyToken = async (token) => {

    return jwt.verify(token, 'Nishant@123');

}

module.exports = { authToken, verfyToken };