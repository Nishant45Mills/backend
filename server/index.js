const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://Hitman45:Nishant123@millie.7r7wqx6.mongodb.net/?retryWrites=true&w=majority').then((data) => {

    app.listen(process.env.PORT, () => {
        console.log("server running on", process.env.PORT);
    })
});