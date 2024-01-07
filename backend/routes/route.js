const { getUsers, register, test, login } = require("../controller/userController")
const express = require('express')



const router = express.Router()

router.get('/users', getUsers)
router.get('/', test)
router.post('/register', register)
router.post('/login', login)

module.exports = router;