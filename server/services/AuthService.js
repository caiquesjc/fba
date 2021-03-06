const jwt = require("jsonwebtoken")
const {promisify} = require("util")

const AuthService = module.exports = {

    expiresIn: 31536000,
    cookieName: "jwtoken",
    secretKey: "144ace4a691b66bdc2d8b674ce3a0237051464b9ca57e8457a47306dbea9d0fb",

    authenticate: async function(req, res, next) {
        try {
            const token = req.cookies.jwtoken
            req.user = await promisify(jwt.verify)(token, AuthService.secretKey)
            return next()
        } catch (error) {
            return res.status(200).send({success: false, error: "authentication failed", erro: error})
        }
    },

    generateToken: function(user, res) {
        const token = jwt.sign(user, AuthService.secretKey, {expiresIn: AuthService.expiresIn})
        res.cookie(AuthService.cookieName, token, {maxAge: AuthService.expiresIn * 1000})
        return token
    },

    verifyAdmin: async function(req, res, next) {
        try {
            if (req.user.use_is_admin) return next()
            return res.status(401).send({success: false, error: "unauthorized"})
        } catch (error) {
            return res.status(200).send({success: false, error: "authentication failed"})
        }
    }

}