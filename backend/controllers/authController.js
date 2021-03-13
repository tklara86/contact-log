const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const createError = require('http-errors');
const {authSchema} = require('../helpers/validation_schema');
const bcrypt = require('bcrypt');

const { signAccessToken } = require('../helpers/jwt_helper');

exports.register = async (req,res, next) => {
    try {

        // Get email and password from the body
        const { email, password } = req.body

        const { error } = await authSchema.validate(req.body)

        if (error) {
            res.status(422).json({
                error: error.message
            })
        }

        // Check if user is already register
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) throw createError.Conflict(`${email} has been already registered`)

        // Hash Password
        const salt = await bcrypt.genSalt(12)
        let hashedPassword = await bcrypt.hash(password, salt)

        // if no errors - register new user with hashed password
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const accessToken = await signAccessToken(user.id)

        res.status(200).json({
            accessToken
        })

    } catch (error) {
        next(error)
    }


}

exports.login = (req,res,next) => {
    res.send('Login user route')
}

exports.refreshToken = (req,res, next) => {
    res.send('Refresh Token Route')
}


exports.logout = (req,res, next) => {
    res.send('Logout route')
}