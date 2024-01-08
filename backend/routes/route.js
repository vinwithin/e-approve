const { getUsers, register, test, login, logout } = require("../controller/userController")
const express = require('express')
const verifyToken  = require("../middleware/verifyToken")
const refreshToken = require('../controller/refreshToken')
const uploadfile = require('../controller/suratController')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/', test)
router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.post('/upload', verifyToken, upload.single('file'), uploadfile )

module.exports = router;