const express = require('express')
const {getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout,getWorkoutsWeekDay,getAllUsers} = require('../controllers/workoutController')

const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all
router.get('/',getWorkouts)

//GET ALL USERS
router.get('/getUsers', getAllUsers)

//GET
router.get('/:id',getWorkout)

//Get workouts weekday
router.get('/weekday/:id',getWorkoutsWeekDay)

//POST
router.post('/', createWorkout)

//DELETE
router.delete('/:id',deleteWorkout)

//UPDATE 
router.patch('/:id', updateWorkout) 


module.exports = router