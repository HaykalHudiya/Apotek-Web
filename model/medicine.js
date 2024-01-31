const mongoose = require('mongoose');
const schema = mongoose.Schema;

const medicine = new schema({
    Kode: { type: String },
    Nama: { type: String },
    Jenis: { type: String },
    Merk: { type: String },
    Formulasi: { type: String },
    Konsentrasi_obat: { type: String },
    Qty: { type: Number, default: 0 },
    Harga: { type: Number },
});

module.exports = mongoose.model("medicine", medicine)