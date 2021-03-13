exports.register = (req,res, next) => {
    res.send('Register route')
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