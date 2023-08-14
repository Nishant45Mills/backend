const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    _org: {

        type: mongoose.Types.ObjectId,
        ref: "org"
    },
    name: {

        type: String,
        required: true

    },

    description: {

        type: String,
        required: true

    },

    images: {

        type: Array
    }
    ,

    price: {

        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema);