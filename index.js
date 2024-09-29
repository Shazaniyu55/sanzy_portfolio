const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 2300;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')))
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message)

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        // Specify your email service provider
        service: 'Gmail', // e.g., 'gmail', 'hotmail', etc.
        auth: {
            user: 'shazaniyu@gmail.com', // Your email address
            pass: 'qkyfkijphqdixilh' // Your email password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'shaazaniyu@gmail.com', // Sender address
        to: 'zoeadoree33@gmail.com, shazaniyu@gmail.com', // List of recipients
        subject: 'JOB REQUEST', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
        // You can add HTML to the email if needed
        // html: '<p>Name: ' + name + '</p><p>Email: ' + email + '</p><p>Message: ' + message + '</p>'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({message: "Email Sent Successfully"});
    });
});

app.listen(PORT, () => {
    console.log(`Server running at PORT http://localhost:${PORT}`);
});

module.exports = app;
