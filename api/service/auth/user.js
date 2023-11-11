const model = require('../../models/auth/user');
const refreshTokenModel = require("../../models/auth/refreshToken");
const dal = require('../../dal/dal');
const bcrypt = require('bcryptjs');
const utils = require('../../utils/utils');
require('dotenv').config();


exports.findOne = async (filter) => {
    return await dal.findOne(model, filter, {});
};

exports.addUser = async (value) => {
    let token;
    value.password = await bcrypt.hash(value.password, 10);
    value.userName = utils.generateUsername(value.name)
    let count
    if (value.email) {
        count = await dal.findOne(model, { email: value.email }, { email: 1 })
        if (count) {
            return { userData: null, token: null, message: "User Already exist with this email" }
        }
    } else if (value.phone) {
        count = await dal.findOne(model, { phone: value.phone }, { phone: 1 })
        if (count) {
            return { userData: null, token: null, message: "User Already exist with this phone" }
        }
    } else {
        return { userData: null, token: null, message: "Invalid mode to signup" }
    }

    const data = await dal.create(model, value)
    const body = {
        id: data._id,
        userName: data.userName,
        name: data.nama,
        email: data?.email || null,
        phone: data?.phone || null,
    };
    token = utils.getAccessToken(body);
    let refreshToken = utils.getRefreshToken(body);

    let refreshBody = {
        userId: data._id,
        token: refreshToken
    }

    await dal.create(refreshTokenModel, refreshBody);

    return {
        userData: body, token: token,
        refreshToken: refreshToken,
    }
}

exports.login = async (value) => {
    let token;
    const projections = {
        userName: 1,
        name: 1,
        email: 1,
        phone: 1,
        password: 1,
    }
    let user;

    if (value.mode === "email") {
        user = await dal.findOne(model, { email: value.email }, projections)
    } else if (value.mode === "phone") {
        user = await dal.findOne(model, { phone: value.phone }, projections)

    } else {
        return { userData: null, token: null, message: "Incorrect mode for login" }
    }

    if (!user) {
        return { userData: null, token: null }
    };
    if (value.password) {
        const result = await bcrypt.compare(value.password, user.password);
        if (!result) return { userData: null, token: null, message: "Please double check the credentials" }
    }
    const userData = {
        id: user._id,
        userName: user?.userName,
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
    }

    token = utils.getAccessToken(userData)
    let refreshToken = utils.getRefreshToken(userData)

    let refreshBody = {
        userId: user._id,
        token: refreshToken
    }
    let tokenData
    tokenData = await dal.findOne(refreshTokenModel, { userId: user._id })
    if (tokenData) return { userData, token: null, message: "USER ALREADY LOGIN" }

    await dal.create(refreshTokenModel, refreshBody)


    return {
        userData,
        token: token,
        refreshToken: refreshToken
    }
}

exports.logout = async (filter) => {
    const data = await dal.findOneAndDelete(refreshTokenModel, filter)
    if (!data) return { message: "Already Logout", status: 400 }
    return { message: "Logout successful", status: 200 }
}