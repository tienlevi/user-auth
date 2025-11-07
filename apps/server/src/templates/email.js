import transporter from "../config/transporter.js";
import { frontEndURL } from "../constants/index.js";

export const sendVerificationEmail = async (
  email,
  verificationToken,
  userName
) => {
  const verificationLink = `${frontEndURL}/?token=${verificationToken}&email=${email}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
              .button {
                display: inline-block;
                padding: 15px 30px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin: 20px 0;
              }
              .button-container {
                text-align: center;
                margin: 30px 0;
              }
              .warning {
                color: #d32f2f;
                font-size: 14px;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #666;
              }
              .link {
                word-break: break-all;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome! Verify Your Email</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                
                <div class="button-container">
                  <a href="${verificationLink}" class="button">Verify Email Address</a>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p class="link">${verificationLink}</p>
                
                <p><strong>This link will expire in 24 hours.</strong></p>
                
                <p>If you didn't create an account, please ignore this email or contact support if you have concerns.</p>
                
                <div class="warning">
                  ⚠️ Never share this verification link with anyone.
                </div>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
  };

  await transporter.sendMail(mailOptions);
};
