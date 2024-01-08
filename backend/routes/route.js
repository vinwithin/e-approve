const { getUsers, register, test, login, logout } = require("../controller/userController")
const express = require('express')
const verifyToken  = require("../middleware/verifyToken")
const refreshToken = require('../controller/refreshToken')
const uploadFile = require('../controller/suratController')
const { check, validationResult } = require('express-validator')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    limits: {
      fileSize: 10 * 1024 * 1024,
    }
  }) ;

const upload = multer({ storage: storage, 
  fileFilter: (req, file, cb) => {
    if(file.mimetype === "aplication/pdf"){
      cb(null, true);
    }else{
      cb(new Error("Format file tidak sesuai"))
    }
}, });

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/', test)
router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.post('/upload', verifyToken, upload.single('file'), uploadFile )

module.exports = router;