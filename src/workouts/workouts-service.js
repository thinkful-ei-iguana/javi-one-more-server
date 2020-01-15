const WorkoutsService = {
    getAllWorkouts(db){
        return db
        .select('*')
        .from('workouts')
    },
    insertWorkout(db,newWorkout){
        return db
        .insert(newWorkout)
        .into('workouts')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getById(db,id){
        return db
        .from('workouts')
        .select('*')
        .where('id',id)
        .first()
    },
    getByUserId(db,id){
        return WorkoutsService.getAllWorkouts(db)
        .where('user_id', id)
        .first()
    }
    deleteWorkout(db,id){
        return db('workouts')
        .where({id})
        .delete()
    },
    updateWorkout(db,id,newWorkout){
        return db('workouts')
        .where({id})
        .update(newWorkout)
    }
}

module.exports = WorkoutsService;