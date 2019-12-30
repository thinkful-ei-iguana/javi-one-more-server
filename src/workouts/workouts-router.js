const express = require('express')
const WorkoutsService = require('./workouts-service')


const workoutsRouter = express.Router();
const bodyParser = express.json();

const serializeWorkout = workout => ({
    id: workout.id,
    title: workout.title,
    workout1: workout.workout1,
    lbs: Number(workout.lbs),
    set1: Number(workout.set1),
    set2: Number(workout.set2),
    set3: Number(workout.set3),
})

workoutsRouter
    .route('/')
    .get((req,res,next) => {
        // res.send('get all workouts')
        WorkoutsService.getAllWorkouts(req.app.get('db'))
          .then(response => {
              res.json(response.map(serializeWorkout))
          })
          .catch(next)
    })

module.exports = workoutsRouter;