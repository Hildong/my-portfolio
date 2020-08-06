const nodemailer = require("nodemailer");
require("dotenv").config()

module.exports = function(clientName, clientEmail, clientMsg) {
    //Creat a variable containing my email, so if I ever want to change it I do it ones instead of doing in through the code
    const email = 'philiphilding.business@gmail.com'

    //Create a variable with my business email credentials 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: process.env.EMAILPWD //Password hidden in .env file, so that no one will be able to see it
        }
      });

    //Create a variable containing all the options for the mail and pass in users values from ReactJS form
    let mailOptions = {
        from: clientEmail,
        to: email,
        subject: 'Philiphilding.com Contact Form Mail',
        text: `${clientMsg}\n\n//${clientName}`
    };

    //Send mail containing mailOptions with transporter variable
    transporter.sendMail(mailOptions, (err, info) => {
        //Log potential errors to console. If there aren't any, log info of the execution
        err ? console.log(err) : console.log(`Email send: ${info.response}`)
      });
}