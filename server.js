const express = require('express')
const cors = require("cors");
const userRouter = require('./users/user_router')
const authRouter = require('./auth/auth_router')
const helmet = require("helmet");

const server = express()
const session = require('express-session')

const sessionConfig = {
    name: "Bob Page",
    secret: process.env.COOKIE_SECRET || "GreyCorona",
    cookie: {
        maxAge: 1000 * 60 * 30, //30 minutes
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: process.send.USER_ALLOW_COOKIES || true
}



server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', userRouter)
server.use('/api', authRouter)

server.use((err, req, res, next) => {
  console.log("Error: ", err)
  res.status(500).json({
    errorMessage: "Something went wrong"
  })
})

module.exports = server;