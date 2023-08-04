const joi = require('joi');
const ApiError = require('../util/ApiError');

const register = (req, res, next) => {

    const schema = joi.object({

        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required(),
        companyName: joi.string().required()

    })

    const { error } = schema.validate(req.body);

    if (error) {

        throw new ApiError(error.details[0].message, 400);
    }

    next();

}

const login = (req, res, next) => {

    const schema = joi.object({

        email: joi.string().required().email(),
        password: joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required()
    })

    const { error } = schema.validate(req.body);

    if (error) {

        throw new ApiError(error.details[0].message, 400);
    }

    next();

}

const forgotpasswordData = (req, res, next) => {

    const schema = joi.object({

        email: joi.string().email()
    })

    const { error } = schema.validate(req.body);

    console.log(error);

    if (error) {

        throw new ApiError(error.details[0].message, 400);
    }


    console.log("slhdsjh");

    next();

}

module.exports = { register, login, forgotpasswordData }