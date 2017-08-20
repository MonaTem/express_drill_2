const express = require('express')
const router = express.Router()
router.get('/posts', (req, res) => {
    res.send('get: posts')
})
module.exports = router