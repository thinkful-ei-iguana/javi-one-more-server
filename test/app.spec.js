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
        return supertest(app)
          .post('/workouts')
          .send({
              title: 'test new workout',
              workout1: 'name of workout',
              lbs: 50,
              set1: 10,
              set2: 10,
              set3: 10
          })
          .expect(201)
    })

})