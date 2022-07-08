const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Authentication
router.post('/', authController.signUp);

//Get allUsers
router.get('/', userController.getAllUsers);

//Get One user
router.get('/:id', userController.getOneUser);

//Update User
router.put('/:id', userController.updateUser);

//Delete User
router.delete('/:id', userController.deleteUser);

module.exports = router;