//Routed from USER.JS
const express = require('express')
const router = express.Router()
const postsLogic = require('../mods/postLogic')

//ROUTES
router.get('/all', (req, res) => {
    res.render('user/posts')
})
router.post('/', (req, res) => {
    res.redirect('posts/all')
})

module.exports = router