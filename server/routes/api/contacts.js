const router = require('express').Router()
const passport = require('passport')
const Contact = require('../../models/Contact')

class UserContact {
    constructor() {
        this.getUserContacts()
        this.addUserContact()
        this.editUserContact()
        this.deleteUserContact()
    }

    getRouter() {
        return router
    }

    // @route   GET api/contacts
    // @desc    Get all users contacts
    // @access  Private
    getUserContacts() {
        router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
            Contact.find({ user: req.user.id })
                .sort({ date: -1 })
                .then(contacts => res.json(contacts))
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                })
        })
    }

    // @route   POST api/contacts
    // @desc    Add new contact
    // @access  Private
    addUserContact() {
        router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
            const { name, email, phone, type } = req.body

            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })

            newContact.save()
                .then(contact => {
                    res.json(contact)
                })
                .catch(err => {
                    console.err(err)
                    res.status(500).json({ message: 'Server error ' })
                })
        })
    }

    // @route   PATCH api/contacts/:id
    // @desc    Update contact
    // @access  Private
    editUserContact() {
        router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
            const { name, email, phone, type } = req.body

            // Build contact object
            const contactFields = {}
            if (name) contactFields.name = name
            if (email) contactFields.email = email
            if (phone) contactFields.phone = phone
            if (type) contactFields.type = type

            Contact.findById(req.params.id)
                .then(contact => {
                    if (!contact) {
                        return res.status(404).json({ message: 'Contact not found' })
                    }

                    // Verify user owns contact
                    if (contact.user.toString() !== req.user.id) {
                        return res.status(401).json({ message: 'Not authorized' })
                    }

                    Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true })
                        .then(contact => res.json(contact))
                        .catch(err => {
                            console.error(err)
                            res.status(500).json({ message: 'Server error' })
                        })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                })
        })

    }

    // @route   Delete api/contacts/:id
    // @desc    Delete contact
    // @access  Private
    deleteUserContact() {
        router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
            Contact.findById(req.params.id)
                .then(contact => {
                    if (!contact) {
                        return res.status(400).json({ message: 'Contact not found' })
                    }

                    // Verify user owns contact
                    if (contact.user.toString() !== req.user.id) {
                        return res.status(401).json({ message: 'Not authorized' })
                    }

                    Contact.findByIdAndRemove(req.params.id)
                        .then(() => res.json({ message: 'Contact removed' }))
                        .catch(err => {
                            console.error(err)
                            res.status(500).json({ message: 'Server error' })
                        })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                })
        })
    }
}

module.exports = new UserContact()
