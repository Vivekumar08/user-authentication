const router = require('express').Router();

const {
    getAccessToken,
    deleteRefreshToken
} = require('../../controllers/auth/refreshToken');

const { verifyRefreshToken } = require("../../middlewares/auth");


router.route("/").get(verifyRefreshToken, getAccessToken);
router.route("/:userId").delete(deleteRefreshToken);


module.exports = router;