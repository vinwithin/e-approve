const Surat = require('../model/Surat');


const uploadFile = async(req, res) => {
  const name = req.body.name;
  const name_letter = req.body.name_letter;
    try{
        await Surat.create({
            name: name,
            name_letter:name_letter,
            file: req.file.filename,
            userId : req.userId,
        })
        res.json({message: "berhasil upload"})
    }catch(error){
        console.log(error)
    }
}

const getSurat = async(req, res) => {
  try{
    const response = await Surat.findAll();
    res.status(200).json(response);
  }catch(error){
    res.status(500).json({msg: "gagal mengambil data"})
  }
}

const approveSurat = async(req, res) => {
    const id = req.params.id
    try{
      await Surat.update({status: "diterima"},{
        where:{
            id: id
        }
      })
      res.status(200).json({message: "berhasil menyetujui"})
    }catch(error){
      res.status(500).json({msg: "gagal mengambil data"})
    }
}

const rejectSurat = async(req, res) => {
  const id = req.params.id
  const comment = req.body.comment
  if(!comment) return res.json({message: "wajib menuliskan komentar"})
  try{
    await Surat.update({status: "revisi", comment:comment},{
      where:{
        id: id
      }
    })
  }catch{
    res.status(400).json({message: "gagal mengubah data"})
  }
}
module.exports = { uploadFile, approveSurat, getSurat }