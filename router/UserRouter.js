const UserController = require('../controller/UserController');         // Include user controller
const userRouter = require('koa-router')({                              // include the koa-router and set the path to /user
    prefix: '/user'
});


userRouter.post('/', UserController.addUser);                           // add a user to the database
// userRouter.get('/:uID', UserController.findYearsActive);                // call function to find the number of years that a user has been active
userRouter.delete('/:uID', UserController.deleteUserByID);              // delete user from the database according to their id
userRouter.put('/', UserController.updateUsernameByID);                 // update a user's username according to their ID
userRouter.get('/:username', UserController.findUserWithUsername);      // find a user in the database that has a certain username
userRouter.get('/getUserWithID/:uID', UserController.findUserWithID);      // find a user in the database that has a certain uID

// export userRouter
module.exports = userRouter;