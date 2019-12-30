const WorkoutsService = {
    getAllWorkouts(db){
        return db
        .select('*')
        .from('one_more')
    },
}

module.exports = WorkoutsService;