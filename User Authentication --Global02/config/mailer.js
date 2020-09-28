const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        // activate gmail less secure option
    });
    //Email options
    const mailOptions = {
        from: "Admin <abc@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    //Send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;