const { getUsers, register, login, logout } = require("../controller/userController")
const express = require('express')
const {verifyToken, adminOnly}  = require("../middleware/verifyToken")
const refreshToken = require('../controller/refreshToken')
const { uploadFile, approveSurat, getSurat } = require('../controller/suratController')
const { check, validationResult } = require('express-validator')

const multer = require('multer')
const Surat = require("../model/Surat")

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

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/users', verifyToken, adminOnly , getUsers)
router.get('/', verifyToken, getSurat)
router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.post('/upload', verifyToken, upload.single('file'), uploadFile )
router.put('/approve/:id', verifyToken, adminOnly, approveSurat)
router.put('/reject/:id', verifyToken, adminOnly, approveSurat)
module.exports = router;