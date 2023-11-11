const Joi = require("joi");

const addUser = Joi.object({
    phone: Joi.string().trim(),
    name: Joi.string().trim().required(),
    userName: Joi.string().trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().required()
});

const loginSchema = Joi.object({
    userName: Joi.string().trim(),
    name: Joi.string().trim(),
    email: Joi.string().email(),
    phone: Joi.string().trim(),
    password: Joi.string(),
    mode: Joi.string().trim().valid("phone", "email")
});

const defaults = {
    'abortEarly': false, // include all errors
    'allowUnknown': true, // ignore unknown props
    'stripUnknown': true // remove unknown props
};

const message = (error) => { return `${error.details.map(x => x.message).join(', ')}`; };

module.exports = {
    addUser,
    loginSchema,
    defaults,
    message
}