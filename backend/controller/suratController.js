const Surat = require('../model/Surat')


const uploadFile = async(req, res) => {
    try{
        await Surat.create({
            name: req.file.filename,
            userId : req.userId
        })
        res.json({message: "berhasil upload"})
    }catch(error){
        console.log(error)
    }
}

const approveSurat = async(req, res) => {
    try{
        
    }catch{

    }
}
module.exports = uploadFile