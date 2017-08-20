const express = require('express')
const router = express.Router()
const srPosts = require('./posts')
    //TODO: PROFILE
router.get('/profile', (req, res) => {
        res.send('get: profile')
    })
    //TODO: POSTS -> Subdomain
router.get('/posts', (req, res) => {
    res.send('get: posts')
})
module.exports = router