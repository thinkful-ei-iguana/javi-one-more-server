# One More Server

## Endpoints

/src/app.js => line 21 app.use('/workouts', WorkoutsRouter)

/scr/workouts/workouts-router.js line20 => .route('/') gets all workouts that have been made

/scr/workouts/workouts-router.js line57 => .route('/:id') gets a single workout created and renders that workout



## Scripts

Start the application npm start

Start nodemon for the application npm run dev

Run the tests npm test

## Deploying

When your new project is ready for deployment, add a new Heroku application with heroku create. This will make a new git remote called "heroku" and you can then npm run deploy which will push to this remote's master branch
