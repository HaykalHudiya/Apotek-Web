const mongoose = require('mongoose');
const schema = mongoose.Schema;

const transaction = new schema({
    nomor_transaksi: { type: String },
    kode_obat: { type: Object },
    nama_obat: { type: Object },
    jumlah_obat: { type: Object },
    harga_obat: { type: Object },
    total_transaksi: { type: Number },
    kode_karyawan: { type: String },
    tanggal_transaksi: { type: Date, default: Date.now },
});

module.exports = mongoose.model("transaction", transaction)