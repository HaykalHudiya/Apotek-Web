const mongoose = require('mongoose');
const schema = mongoose.Schema;

const medicine = new schema({
    Kode: { type: String },
    Nama: { type: String },
    Jenis: { type: String },
    Merk: { type: String },
    formulasi: { type: String },
    konsentrasi_obat: { type: String },
    Harga: { type: Number },
});

module.exports = mongoose.model("medicine", medicine)