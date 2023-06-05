import nodemailer from "nodemailer";

class MailService {
    async sendEmail(email, subject, content) {
        const config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        };

        const message = {
            from: "sgroup@gmail.com",
            to: email,
            subject: subject,
            html: content,
        };

        const transporter = nodemailer.createTransport(config);

        transporter.sendMail(message, (error) => {
            if (error) {
                console.log({ "Mail error": error });
            }
        });
    }
}
export default new MailService();