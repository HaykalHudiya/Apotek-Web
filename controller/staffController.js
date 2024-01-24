const staff = require("../model/staff")

exports.postData = async (req, res, next) => {
    const dataStaff = new staff(req.body);
    await dataStaff.save();
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.getData = async (req, res, next) => {
    const dataStaff = await staff.find({});
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.getDataById = async (req, res, next) => {
    const id = req.params.id;
    const dataStaff = await staff.findById(id);
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.updateDataById = async (req, res, next) => {
    const id = req.params.id;
    const newData = req.body;
    const dataStaff = await staff.findByIdAndUpdate(id, newData);
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}

exports.deleteDataById = async (req, res, next) => {
    const id = req.params.id;
    const dataStaff = await staff.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        data: dataStaff
    })
}