const stock = require("../model/stock")

exports.getData = async (req, res, next) => {
    const currentDate = new Date();
    const twoMonthsFromNow = new Date(currentDate);
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

    const dataStock = await stock.find({});

    const expiringStock = dataStock.filter(item => {
        // Menghitung tanggal kadaluarsa 2 bulan dari sekarang
        const twoMonthsAhead = new Date(item.Exp);
        twoMonthsAhead.setMonth(twoMonthsAhead.getMonth() - 2);

        // Memeriksa apakah tanggal kadaluarsa dalam 2 bulan ke depan
        return twoMonthsAhead <= twoMonthsFromNow;
    });

    const message = `Ada ${expiringStock.length} item stok yang akan kadaluarsa dalam 2 bulan.`;

    return res.status(200).json({
        success: true,
        message: message,
        data: dataStock,
    });
}


exports.getDataASC = async (req, res, next) => {
    const sort = req.params.sort;
    let num = ''
    if (sort == 'asc') {
        num = 1
    } else if (sort == 'desc') {
        num = -1
    }
    const dataStock = await stock.find({}).sort({ Kode: num });
    return res.status(200).json({
        success: true,
        data: dataStock
    })
}

exports.postData = async (req, res, next) => {
    const kode = req.params.kode;
    const count = req.params.count;

    const targetPrefix = kode;
    const regex = new RegExp(`^${targetPrefix}\\d+`);

    const lastStock = await stock.findOne({ Kode: { $regex: regex } }, {}, { sort: { 'Kode': -1 } });
    let number = lastStock ? parseInt(lastStock.Kode.slice(-4)) + 1 : 1;

    const currentDate = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    const dateString = req.body.Exp;
    const expDate = new Date(dateString);

    for (let i = 0; i < count; i++) {
        const kodeS = kode + number.toString().padStart(4, '0');
        req.body.Kode = kodeS;

        // Validasi tanggal Exp
        if (expDate > oneMonthFromNow) {
            const dataStock = new stock(req.body);
            await dataStock.save();

            ++number; // Tambahkan nilai number setiap kali melakukan perulangan
        } else {
            return res.status(400).json({
                success: false,
                message: 'Tanggal Exp harus setidaknya satu bulan di atas tanggal sekarang.'
            });
        }
    }

    return res.status(200).json({
        success: true,
        message: `${count} data stock berhasil ditambahkan.`,
    });
}



