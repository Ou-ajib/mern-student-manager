const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markSchema = new Schema({
    student: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    mark: {
        type: Number,
        required: true,
    }
}, {
  timestamps: true,
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;