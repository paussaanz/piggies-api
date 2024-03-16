const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email account password or app-specific password
    }
});

module.exports.createdFormEmailTemplate = (form) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
    body {
        font-family: Matrice, sans-serif;
        font-weight:600;
        margin: 0;
        padding: 30px;
        background-color: #f4f4f4;
        color: #333;
    }
    .container {
        background-color: #EFEDE4;
        max-width: 100%;
        margin: auto;
        border-radius: 8px;
    }
    .header {
        text-align: center;
        border-radius: 6px 6px 0 0;
    }
    .content {
        line-height: 1.6;
        padding:10px;
        font-size:1.2rem;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.8em;
        color: #666;
    }
    .highlight {
        color: #007bff;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709465939/Piggies/mail_wjrnps.png" alt="Header" style="width: 100%; height: auto;">
        </div>
        <div class="content">
            <p>Hey there, ${form.name}</p>
            <p>We're thrilled to let you know we've received your request and our team is on it. We're cooking up something special just for you and will get back to you as soon as possible.</p>
            <p>In the meantime, here's a recap of what you sent us:</p>
            <p><strong>Message:</strong> <span class="highlight">${form.message}</span></p>
            <p><strong>Request Info:</strong> <span class="highlight">${form.message}</span></p>
            <p>We appreciate your patience and excitement. Stay tuned!</p>
        </div>
        <div class="footer">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709466223/Piggies/FOOTER_fyexwr.png" alt="Header" style="width: 100%; height: auto;">

        </div>
    </div>
</body>
</html>

    `;
};

module.exports.updatedTaskEmailTemplate = (task) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
    body {
        font-family: Matrice, sans-serif;
        font-weight:600;
        margin: 0;
        padding: 30px;
        background-color: #f4f4f4;
        color: #333;
    }
    .container {
        background-color: #EFEDE4;
        max-width: 100%;
        margin: auto;
        border-radius: 8px;
    }
    .header {
        text-align: center;
        border-radius: 6px 6px 0 0;
    }
    .content {
        line-height: 1.6;
        padding:10px;
        font-size:1.2rem;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.8em;
        color: #666;
    }
    .highlight {
        color: #FA6900;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1710582427/MAIL-tasks_atfasz.png" alt="Header" style="width: 100%; height: auto;">
        </div>
        <div class="content">
            <p>Task ${task.name} has been marked as ${task.status ? "done" : "undone"}</p>
            <p>Please make sure it is correct. We appreciate your patience and dedication.</p>
        </div>
        <div class="footer">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1710582427/MAIL-tasks2_n8qy3e.png" alt="Header" style="width: 100%; height: auto;">

        </div>
    </div>
</body>
</html>

    `;
};

module.exports.contactClientEmailTemplate = (message, form) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Matrice, sans-serif;
            font-weight:600;
            margin: 0;
            padding: 30px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            background-color: #EFEDE4;
            max-width: 100%;
            margin: auto;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            border-radius: 6px 6px 0 0;
        }
        .content {
            line-height: 1.6;
            padding:10px;
            font-size:1.2rem;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8em;
            color: #666;
        }
        .highlight {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1710582427/MAIL-contact_ezctya.png" alt="Header" style="width: 100%; height: auto;">
        </div>
        <div class="content">
            <p>Hey there, ${form.name}</p>
            <p>${message}</p>
        </div>
        <div class="footer">
        <img src="https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709466223/Piggies/FOOTER_fyexwr.png" alt="Header" style="width: 100%; height: auto;">

        </div>
    </div>
</body>
</html>

    `;
};

