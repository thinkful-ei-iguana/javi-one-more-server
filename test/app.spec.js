const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app')

describe('APP', () => {
    let db
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.DB_URL,
        });
        app.set('db', db);
      });


    it('GET / responds with 200', () => {
        return supertest(app)
        .get('/workouts')
        .expect('Content-type', /json/)
        .expect(200)

    })
})