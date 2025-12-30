const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
module.exports = app;