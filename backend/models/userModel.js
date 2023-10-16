const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { find } = require('./workoutModel')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
    }
})

userSchema.statics.signup = async function (firstName, lastName, email, password, userRole) {
    if (!firstName || !lastName || !email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    // userRole = 'User'

    const user = await this.create({ firstName, lastName, email, password: hash, userRole })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.statics.findUser = async function(user_id) {
    if (!user_id ) {
        throw Error('User id must be provided')
    }

    const user = await this.findOne(user_id)
    if (!user) {
        throw Error('Incorrect user id')
    }

    return user
}

userSchema.statics.findAllUsers = async function(user_id,user_role) {
    if (!user_id && !user_role ) {
        return 'User id must be provided'
    }

    if(user_role == 'User'){
        return 'Only Admin can see all users'
    }

    const users = await this.find({})

    return users
}

module.exports = mongoose.model('User', userSchema)