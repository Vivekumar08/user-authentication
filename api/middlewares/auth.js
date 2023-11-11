const jwt = require("jsonwebtoken");
const { responseHandler } = require("../middlewares/response-handler")
const refreshTokenService = require("../service/auth/refreshToken");
require("config")


exports.verifyRefreshToken = async (req, res, next) => {
    try {
        var headerToken = req.headers.authorization;
        //if no token found, return response (without going to the next middelware)
        if (!headerToken) {
            return responseHandler(null, res, 'Unauthorized!', 401);
        }

        if (headerToken.includes("Bearer")) {
            headerToken = headerToken.substr(7);
        }

        const token = await refreshTokenService.getToken({ token: headerToken });

        if (!token) {
            return responseHandler(null, res, "Invalid Refresh Token!", 401);
        };

        const decoded = jwt.verify(headerToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        req.user = decoded;
        next();

    } catch (err) {
        console.log("error is ", err);
        return responseHandler(null, res, err, 401);
    }
};

exports.verifyAccessToken = async (req, res, next) => {
    try {

        var token = req.headers.authorization;
        //if no token found, return response (without going to the next middelware)
        if (!token) {
            return responseHandler(null, res, 'Unauthorized!', 401);
        }

        if (token.includes("Bearer")) {
            token = token.substr(7);
        }

        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

        req.user = decoded;
        next();

    } catch (err) {
        console.log("error is ", err);
        return responseHandler(null, res, "Access Denied: Invalid token", 500);
    }
}