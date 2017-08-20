//Routed from INDEX.JS
const express = require('express')
const router = express.Router()
const bcryptJS = require('../mods/bcrypt')
    //HOME
router.get('/', (req, res) => {
        res.render('site/home')
    })
    //TODO: SIGNUP
router.get('/signup', (req, res) => {
    res.render('site/signup')
})
router.post('/signup', bcryptJS.signup)
module.exports = router