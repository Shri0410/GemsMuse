import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, // 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendApprovalEmail = async (customerEmail, approvalLink) => {
    try {
        const mailOptions = {
            from: `"GemsMuse System" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: 'New Customer Registration - Approval Required',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Account Request</h2>
                    <p>A new customer has registered properly on GemsMuse.</p>
                    <p><strong>Email:</strong> ${customerEmail}</p>
                    <p>Please review and approve their account to grant access.</p>
                    <br/>
                    <a href="${approvalLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Approve Account</a>
                    <br/><br/>
                    <p style="color: #666; font-size: 12px;">If button doesn't work, copy this link: ${approvalLink}</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
};

const sendInquiryEmail = async (inquiryData) => {
    try {
        const { customer_name, customer_email, customer_phone, items } = inquiryData;

        let itemsHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Product</th>
                    <th style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">SKU</th>
                    <th style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">Qty</th>
                </tr>
        `;

        items.forEach(item => {
            itemsHtml += `
                <tr>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">${item.name}</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">${item.sku || 'N/A'}</td>
                    <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">${item.quantity}</td>
                </tr>
            `;
        });

        itemsHtml += `</table>`;

        const mailOptions = {
            from: `"GemsMuse System" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: `New Inquiry from ${customer_name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Product Inquiry</h2>
                    <p><strong>Customer:</strong> ${customer_name}</p>
                    <p><strong>Email:</strong> ${customer_email}</p>
                    <p><strong>Phone:</strong> ${customer_phone || 'N/A'}</p>
                    
                    <h3>Interested Items:</h3>
                    ${itemsHtml}
                    
                    <br/>
                    <p style="color: #666; font-size: 12px;">This inquiry has been saved to the dashboard.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Inquiry Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending inquiry email: ", error);
        return false;
    }
};

export default { sendApprovalEmail, sendInquiryEmail };
