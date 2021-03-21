const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();


// Get all contacts for specific user
exports.getContacts = async (req,res,next) => {
    // get logged in user id
    const { aud } = req.payload  // aud is user id
    const id = Number(aud)
    const contacts = await prisma.contact.findMany({
        where: {
            userId: id
        }
    })
    res.status(200).json({
        data: contacts
    })
}

// Add contact
exports.addContact = async (req,res,next) => {
    const { aud } = req.payload
    const id = Number(aud)
    const { name, email, phone } = req.body;

    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            phone,
            user: {
                connect: {
                    id
                }
           }
        }

    })

    res.status(200).json({
        data: {
            contact
        }
    })
}

// Update contact
exports.updateContact = (req,res,next) => {
    res.send('update contact')
}

// Delete contact
exports.deleteContact = (req,res,next) => {
    res.send('delete contact')
}