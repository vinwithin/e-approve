const express = require('express')
const db = require('./config/database')
const router = require('./routes/route')

const app = express()
const port = 3000


// try{
//     db.authenticate();
//     console.log("database terhubung")
// }catch(error){
//     console.log(error)
// }

app.use(express.json())
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})