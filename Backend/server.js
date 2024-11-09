require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your client URL
    credentials: true
}));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3080;
mongoose();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
