const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken'); // Model for storing refresh tokens

// Helper to generate tokens
const generateAccessToken = (user) => {
    return jwt.sign(
        { "UserInfo": { "username": user.username, "roles": user.roles } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET
    );
    await RefreshToken.create({ token: refreshToken, user: user.username });
    return refreshToken;
};

// Login User
const loginUser = async (req, res) => {
    const { user, pwd } = req.body;

    try {
        const foundUser = await User.findOne({ username: user });
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

        const match = await bcrypt.compare(pwd, foundUser.password);
        if (!match) return res.status(401).json({ message: 'Unauthorized' });

        const accessToken = generateAccessToken(foundUser);
        const refreshToken = await generateRefreshToken(foundUser);

        // Set the refresh token as an HTTP-only cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
        res.json({ accessToken, roles: foundUser.roles });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { user, pwd } = req.body;

    try {
        const existingUser = await User.findOne({ username: user });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = new User({
            username: user,
            password: hashedPwd,
            roles: ['user']
        });
        await newUser.save();

        const accessToken = generateAccessToken(newUser);
        const refreshToken = await generateRefreshToken(newUser);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
        res.status(201).json({ message: 'User registered successfully!', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const foundToken = await RefreshToken.findOne({ token: refreshToken });
        if (!foundToken) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            const newAccessToken = generateAccessToken({ username: user.username, roles: user.roles });
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(204);

    await RefreshToken.deleteOne({ token: refreshToken });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};

module.exports = { loginUser, registerUser, refreshAccessToken, logoutUser };

