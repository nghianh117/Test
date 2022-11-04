const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: 'You are not logged in',
            success: false
        })
    }
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.id = decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}
module.exports = verifyToken