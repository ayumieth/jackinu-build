const express = require('express');
const router = express.Router();
const controller = require('../../controllers/guildController');

router.get('/', controller.get);
// router.post('/', controller.create);
// router.put('/', controller.update);
// router.delete('/', controller.remove);

module.exports = router;
