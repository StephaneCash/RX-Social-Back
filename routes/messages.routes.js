const router = require('express').Router();
const messageController = require("../controllers/messageController");

router.post('/', messageController.addMessage);
router.get('/', messageController.getAllMessage);

module.exports = router;