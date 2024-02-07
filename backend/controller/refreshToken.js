const Users = require('../model/User')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const refreshToken = async(req, res) => {
    try{
        const refreshToken = req.cookies.refresh_token
        if (!refreshToken) return res.sendStatus(401)
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        if(!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, decode) => {
            if(err) return res.sendStatus(403)
            const userId = user[0].id
            const name = user[0].name
            const email = user[0].email
            const accessToken =  jwt.sign({userId, name, email}, process.env.PRIVATE_ACCESS_TOKEN, {
                expiresIn: '20s'
            })
            res.json({ accessToken })
        }); 
    }catch(error){
        console.log(error)
    }
}
module.exports = refreshToken