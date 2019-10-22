const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')
const User = require('../../models/User')
const validateUserRegisterInput = require('../../validation/user/register')
const validateUserLoginInput = require('../../validation/user/login')

class UserAuthentication {
    constructor() {
        this.registerUser()
        this.loginUser()
        this.getCurrentUser()
    }

    getRouter() {
        return router
    }

    // @route   POST api/users
    // @desc    Register user
    // @access  Public
    registerUser() {
        router.post('/register', (req, res) => {
            const { errors, isValid } = validateUserRegisterInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { name, email, password } = req.body

            User.findOne({ email })
                .then(user => {
                    if (user) {
                        errors.user = 'User already exists'
                        return res.status(400).json(errors)
                    }

                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    bcrypt.genSalt(12, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    const payload = { id: user._id }

                                    jwt.sign(payload, keys.secret, { expiresIn: 86400 }, (err, token) => { // Expires in a day
                                        if (err) throw err
                                        res.json({ success: true, token: `Bearer ${token}` })
                                    })
                                })
                        })
                    })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                })
        })
    }

    // @route   POST api/login
    // @desc    Login user & get token
    // @access  Public
    loginUser() {
        router.post('/login', (req, res) => {
            const { errors, isValid } = validateUserLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { email, password } = req.body

            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        errors.email = 'No user exists with that email'
                        return res.status(400).json(errors)
                    }

                    // Check password
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (!isMatch) {
                                errors.password = 'Password incorrect'
                                return res.status(400).json(errors)
                            }

                            const payload = { id: user._id }

                            jwt.sign(payload, keys.secret, { expiresIn: 86400 }, (err, token) => { // Expires in a day
                                if (err) throw err
                                res.json({ success: true, token: `Bearer ${token}` })
                            })
                        })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                })
        })
    }

    // @route   GET api/admins/current
    // @desc    Return current admin
    // @access  Private
    getCurrentUser() {
        router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
            res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            })
        })
    }
}

module.exports = new UserAuthentication()