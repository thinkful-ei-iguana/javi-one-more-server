const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .route('/')
    .get((req,res,next) => {
        UsersService.getAllUsers(req.app.get('db'))
          .then(users => {
              res.json(users.map(UsersService.serializeUser))
          })
          .catch(next)
    })
    .post(jsonBodyParser, (req,res,next) => {
        const { user_name, full_name, password } = req.body
        console.log(user_name,full_name,password)
     
        for (const field of ['full_name', 'user_name', 'password'])
        if (!req.body[field])
           return res.status(400).json({
             error: `Missing '${field}' in request body`
           })  
           const passwordError = UsersService.validatePassword(password)

        if (passwordError)
           return res.status(400).json({ error: passwordError })
           UsersService.hasUserWithUserName(
               req.app.get('db'),
               user_name
             )
               .then(hasUserWithUserName => {
                 if (hasUserWithUserName)
                   return res.status(400).json({ error: `Username already taken` })
                   return UsersService.hashPassword(password)
                        .then(hashedPassword => {
                             const newUser = {
                               user_name,
                               password,
                               password: hashedPassword,
                               full_name,
                               date_created: 'now()',
                             }
                   
                             return UsersService.insertUser(
                               req.app.get('db'),
                               newUser
                             )
                               .then(user => {
                                 res
                                   .status(201)
                                   .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                   .json(UsersService.serializeUser(user))
                               })
                        })
               })
               .catch(next)
    })

    usersRouter
      .route("/:user_id")
      .all((req, res, next) => {
        UsersService.getById(req.app.get("db"), req.params.user_id)
       .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: "User doesn't exist" }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(UsersService.serializeUser(res.user));
  })

module.exports = usersRouter