const mongoose = require('mongoose');
const schema = mongoose.Schema;

const staff = new schema({
    Kode: { type: String },
    nama: { type: String },
    alamat: { type: String },
    telepon: { type: String },
    email: { type: String },
    jabatan: { type: String },
    mulai_bekerja: { type: Date },
});

module.exports = mongoose.model("staff", staff)