const nodemailer = require('nodemailer')
const sendEmail=async (options)=>{
    let transporter = nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{
             user:process.env.SMTP_MAIL,
             pass:process.env.SMTP_PASSWORD
        }
    })
    let mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        bcc:options.emailToAdmin,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail;