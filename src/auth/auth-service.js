const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config =require('../config')

const AuthService = {
    getUserWithUserName(db,user_name){
        return db('one_more_users')
        .where({ user_name })
        .first()
    },
    getAllWorkouts(db){
        return db
        .select('user_id')
        .from('workouts')
    },
    getByUserId(db,user_id){
        return db('workouts')
        .where('user_id', user_id)
        .first()
    },
    comparePasswords(password, hash){
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload){
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            expiresIn: config.JWT_EXPIRY,
            algorithm: 'HS256'
        })
    },
    verifyJwt(token){
        return jwt.verify(token, config.JWT_SECRET)
    },
    parseBasicToken(token){
        return Buffer
        .from(token, 'base64')
        .toString(':')
    },
}

module.exports = AuthService