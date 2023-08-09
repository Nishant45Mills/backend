const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const app = require('../app');
const { google } = require('./keys');

app.use(new googleStrategy({
    //options for google strategy
    clientID: google.clientID,
    clientSecrate: google.clientSecrate

}), () => {

    //callback function for passport

})