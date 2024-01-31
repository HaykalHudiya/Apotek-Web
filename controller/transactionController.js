const transaction = require("../model/transaction")
const staff = require("../model/staff")
const medicine = require("../model/medicine")
const stock = require("../model/stock")

exports.postData = async (req, res, next) => {
    let staffName = '';
    const Staff = await staff.findOne({ Kode: req.params.staffs })
    if (Staff) {
        staffName = Staff.nama;
    }
    const requestData = req.body;
    if (requestData[3]) {
        return res.status(400).json({
            success: false,
            message: 'Transaksi melebihi 3 item tidak diizinkan.'
        });
    }
    const nilaiKodeO1 = requestData[0].kode_obat;
    const nilaiKodeO2 = requestData[1].kode_obat;
    const nilaiKodeO3 = requestData[2].kode_obat;
    const jumlah1 = requestData[0].jumlah_obat;
    const jumlah2 = requestData[1].jumlah_obat;
    const jumlah3 = requestData[2].jumlah_obat;
    const medicines1 = await medicine.findOne({ Kode: nilaiKodeO1 });
    const medicines2 = await medicine.findOne({ Kode: nilaiKodeO2 });
    const medicines3 = await medicine.findOne({ Kode: nilaiKodeO3 });
    try {
        const lastKode = await transaction.findOne({}, {}, { sort: { 'nomor_transaksi': -1 } });
        let kode = 1;

        if (lastKode) {
            kode = parseInt(lastKode.nomor_transaksi.slice(2)) + 1;
        }

        const kodeS = 'TR' + kode.toString().padStart(3, '0');

        const Kode = {
            nilaiKodeO1, nilaiKodeO2, nilaiKodeO3
        };
        // Ambil kode dari koleksi medicine
        const kodeList = await medicine.find({}).distinct('Kode');
        let number = 0;
        const jumlahArray = [jumlah3, jumlah2, jumlah1];

        // Iterasi setiap Kode untuk menghitung qty
        for (const kode of kodeList) {
            const regex = new RegExp(`^${kode}\\d+`);
            const qty = await stock.find({ Kode: { $regex: regex } })
                .sort({ 'Exp': 1 })
                .limit(jumlahArray[number]);

            for (const itemToRemove of qty) {
                // Hapus setiap dokumen
                await stock.deleteOne({ _id: itemToRemove._id });
            }
            ++number
        }

        const dataTrs = new transaction({
            nomor_transaksi: kodeS,
            kode_obat: {
                nilaiKodeO1, nilaiKodeO2, nilaiKodeO3
            },
            nama_obat: { nama1: medicines1.Nama, nama2: medicines2.Nama, nama3: medicines3.Nama },
            jumlah_obat: {
                jumlah1, jumlah2, jumlah3
            },
            harga_obat: { harga1: medicines1.Harga, harga2: medicines2.Harga, harga3: medicines3.Harga },
            total_transaksi: (medicines1.Harga * jumlah1) +
                (medicines2.Harga * jumlah2) +
                (medicines3.Harga * jumlah3),
            kode_karyawan: staffName,
        });

        await dataTrs.save();

        return res.status(200).json({
            success: true,
            data: dataTrs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getData = async (req, res, next) => {
    const dataTransn = await transaction.find({}).sort({ 'tanggal_transaksi': 1 });
    return res.status(200).json({
        success: true,
        data: dataTransn
    })
}

exports.getDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const dataTransn = await transaction.findOne({ nomor_transaksi: kode });
    return res.status(200).json({
        success: true,
        data: dataTransn
    })
}