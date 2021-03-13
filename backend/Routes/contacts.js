const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController')


// @route   GET /api/contacts
// @desc    Get all users' contacts
// @access  Private

// @route   POST /api/contacts
// @desc    Add contact
// @access  Private

// @route   PUT /api/contacts/:id
// @desc    Update Contact
// @access  Private

// @route   DELETE /api/contacts/:id
// @desc    Delete Contact
// @access  Private

router.route('/')
    .get(contactsController.getContacts)
    .post(contactsController.addContact)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact)

module.exports = router;