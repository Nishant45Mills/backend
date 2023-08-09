const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL).then((data) => {

    app.listen(process.env.PORT, () => {
        console.log("connected to db");
        console.log("server running on", process.env.PORT);
    })
});