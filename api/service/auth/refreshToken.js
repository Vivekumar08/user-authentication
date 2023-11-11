const model = require("../../models/auth/refreshToken");
const dal = require("../../dal/dal");
const jwt = require("jsonwebtoken");
require("config");

exports.getToken = async (filter, projection = {}) => await dal.findOne(model, filter, projection);

let generateAccessToken = (body) => {
    return jwt.sign(body, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DAY })
}

exports.generateAccessToken = async (data) => {

    const body = {
        id: data.id,
        userName: data?.userName || null,
        name: data.nama,
        email: data?.email || null,
        phone: data?.phone || null,
        active: data.active
    }

    const accessToken = generateAccessToken(body);
    return accessToken;
};

exports.deleteToken = async (filter) => {
    return await dal.findOneAndDelete(model, filter);
}