const service = require('../../service/auth/user');
const { responseHandler, clientHandler } = require("../../middlewares/response-handler");

exports.signup = async (req, res, next) => {
    try {
        const value = req.value;
        const { userData, token, refreshToken, message } = await service.addUser(value);
        if (message) return clientHandler(null, res, message, 400);
        if (!userData) return clientHandler(null, res, 'No user', 400);
        const data = {
            data: userData,
            accessToken: token,
            refreshToken: refreshToken
        };
        responseHandler(data, res);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const value = req.value;

        const { userData, token, refreshToken, message } = await service.login(value);

        if (message) return responseHandler(userData || null, res, message, 400);

        if (!userData) return responseHandler(null, res, 'No user', 400);

        if (!token) return responseHandler(null, res, 'Invalid email OR password!', 400);

        const data = {
            data: userData,
            accessToken: token,
            refreshToken: refreshToken
        };

        responseHandler(data, res);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const filter = { userId: req.user.id }
        const data = await service.logout(filter)
        responseHandler(data.message, res, data.message, data.status)
    } catch (error) {
        console.error(err);
        next(err);
    }
}
