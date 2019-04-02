const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    gender: String,
    age: Number,
    address: String
});

module.exports = mongoose.model('student', studentSchema);