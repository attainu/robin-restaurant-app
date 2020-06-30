const userRouter = require('express').Router();
const userController = require('./../controllers/userController');

userRouter
    .route('/')
    .get(userController.getAllusers)
    .post(userController.createUser);

// userRouter.post('/createUser', userController.createUser);
// userRouter.get('/', userController.getAllusers);


userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

    


module.exports = userRouter;