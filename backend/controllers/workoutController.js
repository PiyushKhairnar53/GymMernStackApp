const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

const getWorkouts = async(req,res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

const getWorkoutsWeekDay = async(req,res) => {
    var {id} = req.params
    const user_id = req.user._id

    id = Number(id)+Number(1);
    console.log("weekday - "+id)

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'No such workout'})
    // }

    const workouts = await Workout.find({user_id}).where('weekday').equals(id).sort({createdAt:-1})

    // const workout = await Workout.findById(id)

    if(!workouts){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workouts)
}

const getWorkout = async(req,res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}

const createWorkout = async(req,res) => {
    const {title,load,reps,weekday} = req.body

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id,weekday})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteWorkout = async(req,res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})
    
    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}

const updateWorkout = async(req,res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    const updatedWorkout = await Workout.findById(id)

    res.status(200).json(updatedWorkout)
}

const getAllUsers = async(req,res) => {
    const user_id = req.user._id
    console.log({user_id})
    
    const currentUser = await User.findUser(user_id)
    console.log(currentUser.firstName)
    console.log(currentUser.lastName)
    console.log(currentUser.userRole)

    const allUsers = await User.findAllUsers(user_id,currentUser.userRole);

    res.status(200).json(allUsers)
}


module.exports = {
    getWorkouts,
    getWorkout,
    getWorkoutsWeekDay,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getAllUsers
}