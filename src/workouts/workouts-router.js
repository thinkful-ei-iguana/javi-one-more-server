const express = require('express')
const WorkoutsService = require('./workouts-service')


const workoutsRouter = express.Router();
const bodyParser = express.json();

const serializeWorkout = workout => ({
    
})