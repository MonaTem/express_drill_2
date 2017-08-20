const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
    //PORT = 8000
const PORT = 8000
const cookieSession = require('cookie-session')
app.use(cookieSession({
        name: 'user_app',
        keys: ['socure1', 'socure2']
    }))
    //ROUTES
const rSite = require('./routes/site')
app.use('/', rSite)
app.use('/signup', rSite)

const rSession = require('./routes/session')
app.use('/session', rSession)

const rUser = require('./routes/user')
app.use('/user', rUser)

app.listen(PORT, () => {
    console.log(`💥  ${new Date().toLocaleString()}`)
    console.log('🚀  Server is running! 🚀')
})