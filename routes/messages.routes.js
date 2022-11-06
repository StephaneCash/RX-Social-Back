const router = require('express').Router();
const messageController = require("../controllers/messageController");

router.post('/', messageController.addMessage);
router.post('/getAllMessages', messageController.getAllMessage);

module.exports = router;