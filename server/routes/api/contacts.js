const router = require('express').Router()

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all users contacts')
})

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Add user contact')
})

// @route   PATCH api/contacts/:id
// @desc    Update contact
// @access  Private
router.patch('/:id', (req, res) => {
    res.send('Update user contact')
})

// @route   Delete api/contacts/:id
// @desc    Update contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete user contact')
})

module.exports = router
