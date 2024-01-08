const Users = require('../model/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll()
        res.json(users)
    }catch(error){
        console.log(error)
    }
}

const register = async(req, res) => {
    const { name, email, password, confirm_password } = req.body
    if (password !== confirm_password) return res.status(401).json({message : "Password dan Confirm Password tidak sama"})
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.json({message:"register berhasil"})
    }catch(error){
        console.log(error)
    }
};

const login = async(req, res) => {
    try{
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })
        const matchPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(!matchPassword){
            res.status(400).json({message:"password salah"})
        }
        const userId = user[0].id
        const name = user[0].name
        const email = user[0].email
        const accessToken = jwt.sign({userId, name, email }, process.env.PRIVATE_ACCESS_TOKEN, {
            expiresIn: '60s'
        })
        const refreshToken = jwt.sign({userId, name, email }, process.env.REFRESH_ACCESS_TOKEN, {
            expiresIn: '1d'
        })
        await Users.update({refresh_token:refreshToken},{
            where:{
                id: userId
            }
        })
        res.cookie('refresh_token', refreshToken,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        })
        res.json({accessToken})
    }catch(error){
        res.status(400).json({message: "email tidak terdaftar"})
    }
}

const logout = async(req, res) => {
    const refresToken = req.cookies.refresh_token
    if(!refresToken) return res.sendStatus(204)
    const user = await Users.findAll({
        where:{
            refresh_token: refresToken
        }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    })
    res.clearCookie('refresh_token')
    return res.sendStatus(200).json({message:"Berhasil Logout"})
}

const test = async(req, res) => {
    res.send("hallo")
}

module.exports= { getUsers, register, test, login, logout };
