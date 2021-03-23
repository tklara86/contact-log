const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const { verifyAccessToken } = require('../helpers/jwt_helper');


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
    .get(verifyAccessToken, contactsController.getContacts)
    .post(verifyAccessToken, contactsController.addContact)
    .put(verifyAccessToken, contactsController.updateContact)
    .delete(verifyAccessToken, contactsController.deleteContact)

module.exports = router;