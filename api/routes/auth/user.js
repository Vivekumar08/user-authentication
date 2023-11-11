const router = require('express').Router();
const user = require('../../controllers/auth/user');

const { verifyAccessToken } = require("../../middlewares/auth");

const validate = require('../../middlewares/validator');

const userValidator = require("../../validators/auth/user"); // Validation Schema

router.route('/signup').post(validate(userValidator.addUser), user.signup);
router.route('/login').post(validate(userValidator.loginSchema), user.login);
router.route('/').get(verifyAccessToken,user.login);
router.route('/logout').delete(verifyAccessToken, user.logout);

module.exports = router;