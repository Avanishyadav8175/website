import nodemailer from "nodemailer";

export const sendMailAlert = ({
  mobileNumber,
  mail
}: {
  mobileNumber: string | null;
  mail: string | null;
}) => {
  const html = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User has registered in COMPANY_NAME</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }

    .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .banner img {
        width: 100%;
        height: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .small-banner img {
        width: 50%;
        height: auto;
    }

    h1 {
        color: #333333;
    }

    p {
        color: #666666;
    }

    .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #6255fa;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
    }

    .button:hover {
        background-color: #4f44e8;
    }

    .button:visited {
        text-decoration: none;
    }

    .button:link {
        text-decoration: none;
    }
    </style>
    </head>

    <body>
    <div class="container">
    <h1>Hello Admin!</h1>
    <p>A New User has registered! User Details are as follows:</p>
    <p><strong>Phone Number</strong>: ${mobileNumber || "Not Provided"}</p>
    <p><strong>Email</strong>: ${mail || "Not Provided"}</p>
    <a href="" class="button">Go To CMS</a>

    <p>Regards<br>COMPANY_NAME.com</p>
    </body>`;

  const transporter = nodemailer.createTransport({
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 587,
    secure: false, // `true` for port 465, `false` for 587
    auth: {
      user: "",
      pass: ""
    }
  });

  const mailOptions = {
    from: "COMPANY_NAME.com noreply@COMPANY_NAME.com",
    to: "someone4263563646@gmail.com",
    subject: "New User Registered in COMPANY_NAME",
    html: html
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("❌ Error sending email:", error);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
};
