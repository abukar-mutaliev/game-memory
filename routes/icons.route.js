const { Router } = require('express');
const { Controller } = require('../controllers/icon.controller');

const router = Router();

router.get('/', Controller.getIcons);

module.exports = router;
