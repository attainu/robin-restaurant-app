const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../model/userSch');

// const sendEmail = async options => {
//     //create transporter
//     const transporter = nodemailer.createTransport("SMTP", {
//         service: 'Gmail',
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     })
//     //defne email option 
//     const mailoptions = {
//         from: 'aaqibbhat <bhhat56@gmail.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         //html:

//     };

//     //send email
//     await transporter.sendMail(mailoptions)
// };
const sendEmail = async options => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'aaqibbhat <hello@aaqib.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;



