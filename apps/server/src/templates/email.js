import transporter from "../config/transporter.js";

export const sendOTPEmail = async (email, otp, userName) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset OTP",
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
              .otp-box {
                background-color: #f0f0f0;
                border: 2px dashed #4CAF50;
                padding: 20px;
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 5px;
                margin: 20px 0;
                border-radius: 5px;
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
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>You requested to reset your password. Please use the following OTP (One-Time Password) to complete the process:</p>
                
                <div class="otp-box">
                  ${otp}
                </div>
                
                <p><strong>This OTP is valid for 10 minutes.</strong></p>
                
                <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                
                <div class="warning">
                  ⚠️ Never share this OTP with anyone. Our team will never ask for your OTP.
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
