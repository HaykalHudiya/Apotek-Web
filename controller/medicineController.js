const medicine = require("../model/medicine")

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