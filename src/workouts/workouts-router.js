const express = require('express')
const xss = require('xss')
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
        WorkoutsService.getAllWorkouts(req.app.get('db'))
          .then(response => {
              res.json(response.map(serializeWorkout))
          })
          .catch(next)
    })
    .post(bodyParser, (req,res,next) => {
        const {title,workout1,lbs,set1,set2,set3} = req.body
        const newWorkout = {title,workout1,lbs,set1,set2,set3}


        for (const [key, value] of Object.entries(newWorkout)) {
             if (value == null) {
               return res.status(400).json({
                 error: { message: `Missing '${key}' in request body` }
               })
             }
           }
        

    WorkoutsService.insertWorkout(
        req.app.get('db'),
        newWorkout
    )
    .then(workout => {
        console.log(workout)
        res
        .status(201)
        .location(`/workouts/${workout.id}`)
        .json(serializeWorkout(workout))
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
                error: { message: `workout ${id} Not Found` }
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
    .delete((req,res,next) => {
        const { id } = req.params
        WorkoutsService.deleteWorkout(
            req.app.get('db'),
            id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(bodyParser, (req,res,next) => {
        const {title,workout1,lbs,set1,set2,set3} = req.body
        const updateWorkout = {title,workout1,lbs,set1,set2,set3}

        const numberOfvalues = Object.values(updateWorkout).filter(Boolean).length
        if(numberOfvalues === 0){
            return res.status(400).json({
                error: {message: `request body must contain either 'title', 'workout1', 'lbs', or 'sets1-3'`}
            })
        }

        WorkoutsService.updateWorkout(
            req.app.get('db'),
            req.params.id,
            updateWorkout
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)

    })
    

module.exports = workoutsRouter;