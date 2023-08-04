// const nodemailer = require('nodemailer');
// const  {authTokenService}  = require('./index')

// const sendResetPasswordByMail = async (user) => {
//     console.log("dksahdjk1");

//     const generateResetToken = await authTokenService.authToken(user);
//     console.log("generateResetToken", generateResetToken);

//     const transporter = nodemailer.createTransport({

//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {

//             user: 'kyle.gaylord@ethereal.email',
//             pass: 'VqxQ7XrWZyK75AYQRM'
//         }
//     })

//     const options = {

//         from: '<admin@gmail.com>',
//         to: user.email,
//         subject: `forgot the password`,
//         html: 'hii ' + user.name + ',please click this link for new password <a href="http://localhost:4200/auth/reset-password?token=' + generateResetToken + '">reset password</a>'

//     }
//     console.log("dksahdjk");
//     const ss = await transporter.sendMail(options);
//     console.log(ss);

// }

// module.exports = { sendResetPasswordByMail }