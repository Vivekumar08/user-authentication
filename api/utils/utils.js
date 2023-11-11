const jwt = require('jsonwebtoken');
const uuid = require('uuid');
require('dotenv').config();

exports.getAccessToken = (body) => {
    return jwt.sign(body, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DAY,
    });
};

exports.getRefreshToken = (body) => {
    return jwt.sign(body, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DAY,
    });
};

exports.getOtp = () => {
    return Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1));
};

exports.generateUsername = (name) => {
    const randomUuid = uuid.v4().replace(/-/g, ''); // Generate a random UUID and remove dashes
    const alphanumericUuid = randomUuid.substring(0, 8); // Extract the first part of the UUID
    return `${name}_${alphanumericUuid}`;
}