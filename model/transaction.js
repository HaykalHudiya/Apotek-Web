const mongoose = require('mongoose');
const schema = mongoose.Schema;

const transaction = new schema({
    Kode: { type: String },
    nomor_transaksi: { type: String },
    tanggal_transaksi: { type: Date },
    total_transaksi: { type: Number },
    status_transaksi: { type: String },
    kode_pelanggan: { type: String },
    kode_karyawan: { type: String },
});
//detail_transaksi
// "kode_transaksi": String,
// "kode_obat": String,
// "nama_obat": String,
// "jumlah_obat": Number,
// "harga_obat": Number,
// "subtotal_obat": Number

module.exports = mongoose.model("transaction", transaction)