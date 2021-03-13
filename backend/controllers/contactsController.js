// Get all contacts
exports.getContacts = (req,res,next) => {
    res.send('Get All Contacts')
}

// Add contact
exports.addContact = (req,res,next) => {
    res.send('add contact')
}

// Update contact
exports.updateContact = (req,res,next) => {
    res.send('update contact')
}

// Delete contact
exports.deleteContact = (req,res,next) => {
    res.send('delete contact')
}