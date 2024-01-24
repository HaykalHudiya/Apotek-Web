const mongoose = require('mongoose');
const schema = mongoose.Schema;

const stock = new schema({
    Kode: { type: String },
    tanggal_masuk: { type: Date },
    exp: { type: Date },
});
//Pengurangan stock dari exp tercepat/id terawal
//validasi stock < pembelian

module.exports = mongoose.model("stock", stock)