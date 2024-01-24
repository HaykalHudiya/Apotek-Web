const transaction = require("../model/transaction");
const generateTransactionNumber = require("../path/to/generateTransactionNumber"); 
const Stock = require("../model/stock"); 

exports.postData = async (req, res, next) => {
    const dataTransn = new transaction(req.body);
    await dataTransn.save();
    return res.status(200).json({
        success: true,
        data: dataTransn
    })
}

exports.getData = async (req, res, next) => {
    const dataTransn = await transaction.find({});
    return res.status(200).json({
        success: true,
        data: dataTransn
    })
}

exports.getDataById = async (req, res, next) => {
    const id = req.params.id;
    const dataTransn = await transaction.findById(id);
    return res.status(200).json({
        success: true,
        data: dataTransn
    })
}

exports.processTransaction = async (req, res, next) => {
    const { id } = req.params;
    const { jumlah_obat } = req.body;
    const userKode = req.user.kode; 

    try {
            const stock = await Stock.findById(id);

            if (!stock) {
                return res.status(404).json({
                    success: false,
                    message: 'Stock not found'
                });
            }

            if (stock.quantity < jumlah_obat) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient stock quantity'
                });
            }

            stock.quantity -= jumlah_obat;
            await stock.save();

            const transaction = new Transaction({
                nomor_transaksi: generateTransactionNumber(),
                kode_obat: stock.kode,
                nama_obat: stock.medicine.nama,
                jumlah_obat: jumlah_obat,
                harga_obat: stock.medicine.harga,
                total_transaksi: jumlah_obat * stock.medicine.harga,
                kode_karyawan: userKode, 
                tanggal_transaksi: new Date(),
                stock: stock._id
            });

            await transaction.save();

            return res.status(200).json({
                success: true,
                data: transaction
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
