const express = require('express')
const { getUsers } = require('../routes/route')


const router = express.Router()

router.get('/users', (req, res)=> {
    res.send(getUsers)
})

module.exports = router;