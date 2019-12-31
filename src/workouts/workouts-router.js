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

workoutsRouter
    .route('/:id')
    .all((req,res,next) => {
        const { id } = req.params
        WorkoutsService.getById(
            req.app.get('db'),
            req.params.id
        )
        .then(workout => {
            if (!workout) {
              return res.status(404).json({
                error: { message: `Bookmark ${id} Not Found` }
              });
            }
            res.workout = workout
            next()
          })
          .catch(next);
    })
    .get((req,res,next) => {
        res.json(serializeWorkout(res.workout))
    })

module.exports = workoutsRouter;