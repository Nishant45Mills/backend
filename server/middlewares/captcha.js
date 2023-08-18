const axios = require('axios');
const ApiError = require('../util/ApiError');

const secrateKey = '6LdPS2wnAAAAABI_pHFHr4Ru9549YTJQByFtlAfX'

const verifyCaptcha = async (req, res, next) => {

    if (req.query.captcha !== 'false') {

        const captcha = req.body.captcha;

        delete req.body.captcha;

        if (!captcha) {

            throw new ApiError('captcha is required', 400)
        }

        const url = `https://www.google.com/recaptcha/api/siteverify?response=${captcha}&secret=${secrateKey}`;
        const options = {
            url: url,
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            }
        };

        const result = await axios(options)

        const { success, score, action, hostname } = result.data;

        if (success) {

            next();
        }

    }

    else {

        next();
    }


}

module.exports = { verifyCaptcha }