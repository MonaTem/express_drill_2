//Routed from INDEX.JS
const express = require('express')
const router = express.Router()
const srPosts = require('./posts')
    //TODO: PROFILE
router.get('/profile', (req, res) => {
        res.render('user/profile')
    })
    //TODO: POSTS -> Subdomain
router.use('/posts', srPosts)
module.exports = router