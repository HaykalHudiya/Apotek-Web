const transaction = require("../model/transaction")

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