const mongoose = require('mongoose');
const schema = mongoose.Schema;

const stock = new schema({
    Kode: { type: String },
    Tanggal_masuk: { type: Date, default: Date.now },
    Exp: { type: Date },
});
//Pengurangan stock dari exp tercepat/id terawal
//validasi stock < pembelian

module.exports = mongoose.model("stock", stock)