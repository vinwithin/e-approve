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
    const id = req.params.id
    try{
      await Surat.update({revisi: false},{
        where:{
            id: id
        }
      })
      res.json({message: "berhasil menyetujui"})
    }catch(error){
      console.log(error)
    }
}

const rejectSurat = async(req, res) => {
  const id = req.params.id
  const comment = req.body.comment
  if(!comment) return res.json({message: "wajib menuliskan komentar"})
  try{
    await Surat.update({revisi: false, comment:comment},{
      where:{
        id: id
      }
    })
  }catch{
    res.json({message: "gagal mengubah data"})
  }
}
module.exports = { uploadFile, approveSurat }