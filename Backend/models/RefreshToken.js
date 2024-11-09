// models/RefreshToken.js
const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: { type: String, required: true } // Username for easy tracking
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
