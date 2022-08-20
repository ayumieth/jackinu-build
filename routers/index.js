const router = require('express').Router()

const auth = require('./api/auth')
const guild = require('./api/guild')
const role = require('./api/role')

router.use('/auth', auth)
router.use('/guild', guild)
router.use('/role', role)

module.exports = router;