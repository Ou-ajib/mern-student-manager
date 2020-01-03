const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const majorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    subjects:[
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
}, {
    timestamps: true,
});

const Major = mongoose.model('Major', majorSchema);

module.exports = Major;