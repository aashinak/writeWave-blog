const JWT = require('jsonwebtoken')
require('dotenv').config()

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }
 
    const token = JWT.sign(payload, process.env.JWT_SECRET)
    return token
}

const validateToken = (token) => {
    const payload = JWT.verify(token, process.env.JWT_SECRET)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}
