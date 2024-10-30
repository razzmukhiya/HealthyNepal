const nodemailer = require("nodemailer");
const { options } = require("../controller/user");


const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    async function sendMail(recipients, subject, body) {
        if (!recipients || recipients.length === 0) {
            throw new Error('No recipients defined');
        }

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: recipients.join(','),
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};
}
module.exports = sendMail;