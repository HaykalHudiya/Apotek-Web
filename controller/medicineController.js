const medicine = require("../model/medicine")

// exports.postData = async (req, res, next) => {
//     // Extract initial and final letters from the "Nama" field
//     const nama = req.body.Nama;
//     const merk = req.body.merk_obat;
//     let ids = 0
//     let midkode;  // Deklarasikan midkode di luar blok if-else
//     let nomormd

//     if (merk.length % 2 !== 0) {
//         midkode = merk.charAt(0) + merk.charAt((merk.length / 2) + 0.5) + merk.charAt(merk.length - 1);
//     } else {
//         midkode = merk.charAt(0) + merk.charAt((merk.length / 2) + 1) + merk.charAt(merk.length - 1);
//     }
//     let idss = ++ids;

//     const kode = nama.charAt(0) + nama.charAt(nama.length - 1) + midkode;
//     if (idss > 9) {
//         const nomor = '000';
//         nomormd = nomor.substring(1) + idss;
//     } else if (idss > 99) {
//         const nomor = '00';
//         nomormd = nomor.substring(1) + idss;
//     } else if (idss > 999) {
//         const nomor = '0';
//         nomormd = nomor.substring(1) + idss;
//     } else {
//         const nomor = '000';
//         nomormd = nomor + idss;
//     }
//     const kodeU = kode.toUpperCase() + nomormd;

//     // Add the "Kode" field to the request body
//     req.body.Kode = kodeU;

//     // Create a new medicine instance with the modified request body
//     const dataMdc = new medicine(req.body);

//     try {
//         // Save the data to the database
//         await dataMdc.save();

//         // Return the success response
//         return res.status(200).json({
//             success: true,
//             data: dataMdc
//         });
//     } catch (error) {
//         // Handle errors if any
//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };
exports.postData = async (req, res, next) => {
    const dataMdc = new medicine(req.body);
    await dataMdc.save();
    return res.status(200).json({
        success: true,
        data: dataMdc
    })

}


exports.getData = async (req, res, next) => {
    const dataMdc = await medicine.find({});
    return res.status(200).json({
        success: true,
        data: dataMdc
    })
}

exports.getDataById = async (req, res, next) => {
    const id = req.params.id;
    const dataMdc = await medicine.findById(id);
    return res.status(200).json({
        success: true,
        data: dataMdc
    })
}

exports.updateDataById = async (req, res, next) => {
    const id = req.params.id;
    const newData = req.body;
    const dataMdc = await medicine.findByIdAndUpdate(id, newData);
    return res.status(200).json({
        success: true,
        data: dataMdc
    })
}