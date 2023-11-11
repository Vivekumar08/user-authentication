const mongoose = require('mongoose');
Schema = mongoose.Schema;


const refreshTokenSchema = Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'users',
        unique: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});

refreshTokenSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 30 * 86400 });
module.exports = mongoose.model('refreshtokens', refreshTokenSchema);