const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const model = require('../../models/index');
const user_service = require('../../services/user/user_service');

// Middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Routes goes here

// Default route
router.all('/', function(req, res) {
    return res.json({
        status: true,
        message: 'User controller...'
    })
});

module.exports = router;