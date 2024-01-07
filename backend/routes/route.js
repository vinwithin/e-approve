const { getUsers, register, test, login, logout } = require("../controller/userController")
const express = require('express')
const verifyToken  = require("../middleware/verifyToken")
const refreshToken = require('../controller/refreshToken')


const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/', test)
router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

module.exports = router;