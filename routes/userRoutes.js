const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Authentication
router.post('/', authController.signUp);

//Get allUsers
router.get('/', userController.getAllUsers);

//Get One user
router.get('/:id', userController.getOneUser);

module.exports = router;