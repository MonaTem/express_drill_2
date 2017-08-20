const express = require('express')
const router = express.Router()
    //TODO: HOME
router.get('/', (req, res) => {
        res.render('site/home')
    })
    //TODO: SIGNUP
router.get('/signup', (req, res) => {
    res.render('site/signup')
})
router.post('/signup', (req, res) => {
    const email = req.body.email
    const pw = req.body.password
    res.send(`post: signup ${email}, ${pw}`)
})
module.exports = router