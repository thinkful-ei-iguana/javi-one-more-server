const WorkoutsService = {
    getAllWorkouts(db){
        return db
        .select('*')
        .from('workouts')
    },
}

module.exports = WorkoutsService;