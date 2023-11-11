const service = require("../../service/auth/refreshToken");
const { responseHandler } = require("../../middlewares/response-handler");
const mongoose = require('mongoose')

exports.getAccessToken = async (req, res, next) => {
    try {

        const user = req.user;

        const accessToken = await service.generateAccessToken(user);

        responseHandler({ accessToken: accessToken }, res);

    } catch (error) {
        console.error("error is ", error);
        next(error);
    }
};

exports.deleteRefreshToken = async (req, res, next) => {
    try {

        const userId = req.params.userId;

        const token = await service.getToken({ userId: new mongoose.Types.ObjectId(userId) });

        if (!token) {
            return responseHandler(null, res, "something went wrong, unable to delete token!", 401);
        };

        return responseHandler(null, res, "Token Deleted Successfully!", 200);

    } catch (error) {
        console.error("error is ", error);
        next(error);
    }
}