const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');


const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

// Middleware to parse JSON bodies with increased limit for file uploads
app.use(express.json({ limit: '50mb' }));    
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/auth',require('../routes/auth.route'));

app.use("/profile", require("../routes/profile.route"));

app.use("/posts", require("../routes/post.route"));

module.exports=app;