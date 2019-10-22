const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const User = require('../../models/User')
const validateUserRegisterInput = require('../../validation/user/register')
const validateUserLoginInput = require('../../validation/user/login')

// @route   GET api/admins/current
// @desc    Return current admin
// @access  Private
// router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({
//         id: req.user.id,
//         name: req.user.name,
//         username: req.user.username,
//         email: req.user.email
//     })
// })

module.exports = router