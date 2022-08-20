const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roleController');

router.get('/', controller.get);
router.post('/modifyRole', controller.modifyRole);
router.post('/buyRole', controller.buyRole);

module.exports = router;
