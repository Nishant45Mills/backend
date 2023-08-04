const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({

    companyName: {

        type: String,
        required: true,
        trim: true
    },

    email: {

        type: String,
        required: true,
        trim: true
    }
}, {

    timestamps: true
});

module.exports = mongoose.model('org', orgSchema);