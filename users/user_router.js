const router = require("express").Router();
const user = require('./users_model.js');
const express = require('express')


router.get('/', ( res) => {
    user.getting()
    .then(gotten => {
        res.status(200).json(gotten)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

router.use(restricted)


function restricted(req, res, next) {
    if(req.session && req.session.loggedIn){
        next()
    }else{
        res.status(401).json({
            message: "Log in now"
        })
    }
}

module.exports = router