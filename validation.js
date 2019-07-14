//  joi allows you to create blueprints or schemas for
// JavaScript objects (an object that stores information) to ensure validation of key information.
const Joi = require('@hapi/joi');

// validate register schema
const registerValidation = (data) => {
    const registerSchema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, registerSchema);
};

// validate login schema
const loginValidation = (data) => {
    const loginSchema = {
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, loginSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;