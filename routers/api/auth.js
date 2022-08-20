const express = require('express');
const router = express.Router();
const controller = require('../../controllers/authController');

const config = require('../../config')
const passport = require('passport')

router.get('/', controller.get);

router.get('/logout', function (req, res) {
    req.logout();
    res.json({ status: 'success' })
})

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/redirect',
    passport.authenticate('discord', {
        failureRedirect: `${config.FRONTEND_URL}/`
    }), (req, res) => {
        res.redirect(`${config.FRONTEND_URL}/dashboard`)
    }
);

module.exports = router;
