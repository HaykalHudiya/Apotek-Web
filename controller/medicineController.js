const medicine = require("../model/medicine")
const stock = require("../model/stock")

exports.postData = async (req, res, next) => {
    const nama = req.body.Nama;
    const merk = req.body.Merk;

    // Buat kode obat berdasarkan aturan yang sudah ada
    let midkode;

    if (merk.length % 2 !== 0) {
        midkode = merk.charAt(0) + merk.charAt((merk.length / 2) + 0.5) + merk.charAt(merk.length - 1);
    } else {
        midkode = merk.charAt(0) + merk.charAt((merk.length / 2) + 1) + merk.charAt(merk.length - 1);
    }

    const kode = nama.charAt(0) + nama.charAt(nama.length - 1) + midkode;
    const kodeU = kode.toUpperCase();

    // Cek apakah kode sudah digunakan sebelumnya
    const existingMedicine = await medicine.findOne({ Kode: kodeU });

    if (existingMedicine) {
        return res.status(400).json({
            success: false,
            error: 'Kode obat sudah digunakan sebelumnya. Mohon pilih kode yang berbeda.'
        });
    }

    // Jika kode belum pernah digunakan, simpan data
    req.body.Kode = kodeU;

    try {
        const dataMdc = new medicine(req.body);
        await dataMdc.save();
        return res.status(200).json({
            success: true,
            data: dataMdc
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.getData = async (req, res, next) => {
    try {
        const kodeList = await medicine.find({}).distinct('Kode');
        const qtyPerKode = {};

        for (const kode of kodeList) {
            const regex = new RegExp(`^${kode}\\d+`);
            const qty = await stock.countDocuments({ Kode: { $regex: regex } });
            qtyPerKode[kode] = qty;

            // Jika perlu pembaruan di dalam loop, sesuaikan dengan logika aplikasi Anda
            await medicine.findOneAndUpdate({ Kode: kode }, { Qty: qtyPerKode[kode] }, { new: true });
        }

        // Ambil semua data dari koleksi medicine setelah pembaruan
        const dataWithQty = await medicine.find({});

        return res.status(200).json({
            success: true,
            data: dataWithQty,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.getDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const dataMdc = await medicine.findOne({ Kode: kode });
    return res.status(200).json({
        success: true,
        data: dataMdc
    })
}
// exports.getDataByNama = async (req, res, next) => {
//     const nama = req.params.nama;
//     const Qty = req.params.qty;
//     const kode = await medicine.findOne({ Nama: nama });
//     const qtyPerKode = {};
//     const regex = new RegExp(`^${kode.kode}\\d+`);
//     const qty = await stock.countDocuments({ Kode: { $regex: regex } });
//     qtyPerKode = qty;
//     const dataMdc = await medicine.find({ Nama: nama, Qty: Qty });
//     return res.status(200).json({
//         success: true,
//         data: dataMdc
//     })
// }

exports.updateDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const newData = req.body;
    const dataMdc = await medicine.findOneAndUpdate({ Kode: kode }, newData, { new: true });
    return res.status(200).json({
        success: true,
        data: dataMdc
    })
}