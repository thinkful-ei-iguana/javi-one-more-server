const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app')

describe('APP', () => {
    let workoutsCopy, db;
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        });
        app.set('db', db);
      });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => db('workouts').truncate());

    afterEach('cleanup', () => db('workouts').truncate());


    it('GET / responds with 200', () => {
        return supertest(app)
        .get('/workouts')
        .expect('Content-type', /json/)
        .expect(200)
    })

    it('creates a workout, responding with 201 and the new workout', () => {
        const newWorkout  = {
            title: 'test new workout',
            workout1: 'name of workout',
            lbs: 50,
            set1: 10,
            set2: 10,
            set3: 10
        }

        return supertest(app)
          .post('/workouts')
          .send(newWorkout)
          .expect(201)
          .expect(res => {
              expect(res.body.title).to.eql(newWorkout.title)
              expect(res.body.workout1).to.eql(newWorkout.workout1)
              expect(res.body.lbs).to.eql(newWorkout.lbs)
              expect(res.body.set1).to.eql(newWorkout.set1)
              expect(res.body.set2).to.eql(newWorkout.set2)
              expect(res.body.set3).to.eql(newWorkout.set3)
              expect(res.body).to.have.property('id')
              expect(res.headers.location).to.eql(`/workouts/${res.body.id}`)

          })
          .then(postRes => 
            supertest(app)
              .get(`/workouts/${postRes.body.id}`)
              .expect(postRes.body)
            )
    })

    it(`responds with 400 and an error message when the title is missing`, () => {
        return supertest(app)
            .post('/workouts')
            .send({
                workout1: 'name of workout',
                lbs: 50,
                set1: 10,
                set2: 10,
                set3: 10
            })
            .expect(400, {
                error: {message: `Missing 'title' in request body`}
            })
    })

    it(`responds with 400 and an error message when the workout is missing`, () => {
        return supertest(app)
            .post('/workouts')
            .send({
                title: 'test workout',
                lbs: 50,
                set1: 10,
                set2: 10,
                set3: 10
            })
            .expect(400, {
                error: {message: `Missing 'workout' in request body`}
            })
    })

    

})