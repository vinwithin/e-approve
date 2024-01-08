const express = require('express')
const db = require('./config/database')
const Surat = require('./model/Surat')
const router = require('./routes/route')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000


// try{
//     db.authenticate();
//     console.log("database terhubung")
//     Surat.sync()
// }catch(error){
//     console.log(error)
// }
app.use(cookieParser())
app.use(express.json())
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})