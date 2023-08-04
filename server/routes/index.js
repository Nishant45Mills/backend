const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const express = require('express');
const router = express.Router();

const defaultArray = [{

    path: '/auth',
    route: authRoute
},
{

    path: '/user',
    route: userRoute
}
];

defaultArray.forEach((data) => {

    router.use(data.path, data.route);

})

module.exports = router;