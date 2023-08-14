const nodemailer = require('nodemailer');

const sendMail = async (to, token, html, subject) => {

    const transporter = nodemailer.createTransport({

        host: 'smtp.ethereal.email',
        port: 587,
        auth: {

            user: 'kyle.gaylord@ethereal.email',
            pass: 'VqxQ7XrWZyK75AYQRM'
        }
    })

    const options = {

        from: '<admin@gmail.com>',
        to: to,
        subject: subject,
        html: html

    }

    return transporter.sendMail(options);

}

const sendVerifyMail = async (to, token) => {

    const htmlText = 'hii ,please click this link for verification <a target=`_self` href="http://localhost:4200/auth/verify-email?token=' + token + '">Verify the account</a>'
    const subject = 'Account verification';

    const mail = await sendMail(to, token, htmlText, subject);
    return mail;
}

module.exports = { sendMail, sendVerifyMail };
