const router = require("express").Router();
const user = require('/Users/C/Desktop/node-auth1-project/users/user_model.js');
const express = require('express')


router.get('/', ( res) => {
    user.getting()
    .then(gotten => {
        res.status(200).json(gotten)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: "fail to get"
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


router.get('/', ( res) => {
    user.getAllUsers()
    .then(gotAll => {
        res.status(200).json(gotAll)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: "fail to get"
        })
    })
})

module.exports = router