const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'beatrice.conchado@gmail.com',
        pass: 'lkur fphb zxsk rhfq'
    }
});
module.exports = transporter
