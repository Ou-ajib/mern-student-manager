const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
}, {
  timestamps: true,
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;