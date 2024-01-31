const staff = require("../model/staff")

exports.postData = async (req, res, next) => {
    try {
        // Ambil nilai kode terakhir dari database
        const lastStaff = await staff.findOne({}, {}, { sort: { 'Kode': -1 } });
        let kode = 1;

        if (lastStaff) {
            // Jika ada data, ambil nilai kode dan tambahkan 1
            kode = parseInt(lastStaff.Kode.slice(2)) + 1;
        }

        // Format kode sesuai dengan kebutuhan Anda
        const kodeS = 'ST' + kode.toString().padStart(3, '0');

        // Simpan data ke database
        req.body.Kode = kodeS;
        const dataStaff = new staff(req.body);
        await dataStaff.save();

        return res.status(200).json({
            success: true,
            data: dataStaff
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getData = async (req, res, next) => {
    const dataStaff = await staff.find({});
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.getDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const dataStaff = await staff.findOne(kode);
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.updateDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const newData = req.body;
    const dataStaff = await staff.findOneAndUpdate({ Kode: kode }, newData, { new: true });
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.deleteDataById = async (req, res, next) => {
    const kode = req.params.kode;
    const dataStaff = await staff.findOneAndDelete({ Kode: kode });
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}