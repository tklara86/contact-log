const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const createError = require('http-errors');
const {authSchema} = require('../helpers/validation_schema');
const bcrypt = require('bcrypt');

const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper');

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
        const refreshToken = await signRefreshToken(user.id)

        res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        next(error)
    }


}

exports.login = async (req,res,next) => {
    try {
        const { email, password } = req.body

        const {  error } = authSchema.validate(req.body)

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        // if user not found
        if (!user) throw createError.NotFound('User not registered')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        // Compare passwords and send access token
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (isMatch) {

                res.status(200).json({
                    accessToken,
                    refreshToken
                })
            }

            if (!isMatch) {
                next(createError.Unauthorized('Username/password not valid'))
            }
        })

    } catch (error) {
        if (error.isJoi === true) {
            return next(createError.BadRequest('Invalid Email/Password'))
        }
        next(error)
    }
}

exports.refreshToken = async (req,res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) throw createError.BadRequest()

        const userId = await verifyRefreshToken(refreshToken)

        const accessToken  = await signAccessToken(userId)
        const refreshedToken = await signRefreshToken(userId)
        res.send({ accessToken, refreshedToken })
    } catch (e) {
        next(e)
    }
}


exports.logout = (req,res, next) => {
    res.send('Logout route')
}