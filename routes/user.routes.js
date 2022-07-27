const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer();

// Authentication
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.deconnexion);

//Get allUsers
router.get('/', userController.getAllUsers);
//Get One user
router.get('/:id', userController.getOneUser);
//Update User
router.put('/:id', userController.updateUser);
//Delete User
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.followUser);
router.patch('/unFollowUser/:id', userController.unFollowUser);

router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router;