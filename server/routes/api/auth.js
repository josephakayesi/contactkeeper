const router = require('express').Router()

// @route   POST api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', (req, res) => {
    res.send('Login user & get token')
})

module.exports = router