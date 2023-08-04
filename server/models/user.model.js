const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const roles = ['admin', 'user']

const userSchema = mongoose.Schema({

    _org: {

        type: mongoose.Types.ObjectId,
        ref: "org"
    },

    name: {

        type: String,
        required: true,
        trim: true

    },

    email: {

        type: String,
        required: true
    },

    password: {

        type: String,
        required: true,
        select: false
    },

    role: {

        type: String,
        enum: roles,
        default: 'user'
    },

    isEmailVerfified: {

        type: Boolean,
        default: false
    },

    deleted: {

        type: Boolean,
        default: false
    }
}, {

    timestamps: true
})

userSchema.methods.comaparePassword = async function (password) {

    const user = this;
    return bcrypt.compare(password, user.password)

}

module.exports = mongoose.model('user', userSchema);