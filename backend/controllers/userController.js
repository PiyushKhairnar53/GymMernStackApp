const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const role = user.userRole;
        const token = createToken(user._id)

        res.status(200).json({ email, token, role })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log(firstName + lastName + email + password);

    try {
        const userRole = 'User'
        await User.signup(firstName, lastName, email, password, userRole)

        // create a token
        // const token = createToken(user._id)

        res.status(200).json({ firstName, lastName, email, userRole })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { loginUser,signupUser }