const { responseHandler } = require("../middlewares/response-handler");

const defaults = {
    'abortEarly': false, // include all errors
    'allowUnknown': true, // ignore unknown props
    'stripUnknown': true // remove unknown props
};

const validate = (schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body, defaults);
        if(error){
            return responseHandler(error, res, error.message, 422);
        }
        req.value = value;
        next();
    }
};


module.exports = validate;