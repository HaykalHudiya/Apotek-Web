const stock = require("../model/stock");
const transaction = require("../model/transaction");

exports.createStock = async (req, res, next) => {
  try {
    const newStock = new stock(req.body);
    await newStock.save();
    res.status(201).json({
      success: true,
      data: newStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllStocks = async (req, res, next) => {
  try {
    const stocks = await stock.find({});
    res.status(200).json({
      success: true,
      data: stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const stock = await stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stok tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const updatedStock = await stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStock) {
      return res.status(404).json({
        success: false,
        message: "Stok tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const deletedStock = await stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) {
      return res.status(404).json({
        success: false,
        message: "Stok tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.decreaseQuantity = async (req, res, next) => {
  try {
    const { id, jumlah_obat } = req.params;

    const stock = await stock.findById(id);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stok tidak ditemukan",
      });
    }

    if (stock.quantity < jumlah_obat) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock quantity",
      });
    }

    stock.quantity -= jumlah_obat;
    await stock.save();

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};