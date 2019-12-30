const WorkoutsService = {
    getAllWorkouts(knex){
        return knex.select('*').from('one_more')
    },
}