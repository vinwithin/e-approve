const Users = require('../model/User')



const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll()
        res.json(users)
    }catch(error){
        console.log(error)
    }
}
module.exports = getUsers;