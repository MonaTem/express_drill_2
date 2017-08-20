const bcrypt = require('bcrypt-as-promised')
const APP_MODE = 'development'
const Knex = require('knex')
const dbConfig = require('../knexfile')
const knexDB = Knex(dbConfig[APP_MODE])

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 12)
        .then((digest) => {
            knexDB('users')
                .insert({
                    email: req.body.email,
                    h_pw: digest
                }, '*')

            .then((output) => {
                const user = output[0]
                req.session.user_id = user.id

                res.redirect('user/profile')
            })
        })
        .catch(() => {
            res.send('knex error')
        })
}

exports.login = (req, res) => {
    knexDB('users')
        .where('email', '=', req.body.email)
        .first()
        .then((existing) => {
            bcrypt.compare(req.body.password, existing.h_pw)
                .then(() => {
                    console.log('password okay')
                    req.session.user_id = existing.id
                    res.redirect('../user/profile')
                })
        })
        .catch(() => {
            res.redirect('session/login')
        })
}