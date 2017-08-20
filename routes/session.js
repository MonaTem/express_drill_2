const express = require('express')
const router = express.Router()
    //TODO: LOGIN
router.get('/login', (req, res) => {
        res.send('get: login')
    })
    //TODO: LOGOUT
router.get('/logout', (req, res) => {
        res.send('get: logout')
    })
    //TODO: SESSION CHECK?
router.get('/check', (req, res) => {
    res.send('get: check')
})
module.exports = router