const mongoose = require('mongoose');
const schema = mongoose.Schema;

const stock = new schema({
    Kode: { type: String },
    tanggal_masuk: { type: Date },
    exp: { type: Date },
    medicine: {
        type: schema.Types.ObjectId,
        ref: 'medicine'
    }
});

module.exports = mongoose.model("stock", stock)