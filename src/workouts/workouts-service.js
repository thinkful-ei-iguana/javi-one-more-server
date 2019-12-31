const WorkoutsService = {
    getAllWorkouts(db){
        return db
        .select('*')
        .from('workouts')
    },
    getById(db,id){
        return db
        .from('workouts')
        .select('*')
        .where('id',id)
        .first()
    },
}

module.exports = WorkoutsService;