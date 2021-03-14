const JWT = require('jsonwebtoken');
const createError = require('http-errors');


exports.signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: "1hr",
            issuer: "website.com",
            audience: `${userId}`
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                return reject(createError.InternalServerError("Internal server error"))
            }
            resolve(token)

        })
    })
}

exports.verifyAccessToken = (req,res,next) => {
    if(!req.headers['authorization']) return next(createError.Unauthorized())

    const authorizationHeader = req.headers['authorization'];
    const bearerToken = authorizationHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized())
        }
        req.payload = payload
        next()

    })


}