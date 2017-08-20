//Routed from INDEX.JS
const express = require('express')
const router = express.Router()
const bcryptJS = require('../mods/bcrypt')
    //LOGIN
router.get('/login', (req, res) => {
    res.render('session/login')
})
router.post('/login', bcryptJS.login)
    //TODO: LOGOUT
router.get('/logout', (req, res) => {
        res.render('session/logout')
    })
    //TODO: SESSION CHECK?
router.get('/check', (req, res) => {
    res.send('get: check')
})
module.exports = router