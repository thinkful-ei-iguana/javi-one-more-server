const AuthService = require('../auth/auth-service')


function requireAuth(req,res,next){
        const authToken = req.get('Authrization') || ''

        


}

module.exports = {
    requireAuth,
}