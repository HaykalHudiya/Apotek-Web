const mongoose = require('mongoose');
const schema = mongoose.Schema;

const transaction = new schema({
    nomor_transaksi: { type: String },
    kode_obat: { type: String },
    nama_obat: { type: String },
    jumlah_obat: { type: Number },
    harga_obat: { type: Number },
    total_transaksi: { type: Number },
    kode_karyawan: { type: String },
    tanggal_transaksi: { type: Date },
});

module.exports = mongoose.model("transaction", transaction)