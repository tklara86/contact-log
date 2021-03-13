const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

// Get all contacts

exports.getContacts = async (req,res,next) => {
    const contacts = await prisma.contact.findMany()

    res.status(200).json({
        data: contacts
    })
}

// Add contact
exports.addContact = (req,res,next) => {

}

// Update contact
exports.updateContact = (req,res,next) => {
    res.send('update contact')
}

// Delete contact
exports.deleteContact = (req,res,next) => {
    res.send('delete contact')
}