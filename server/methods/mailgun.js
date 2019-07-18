// Link to Combine MailGun and NodeMailer
// https://www.youtube.com/watch?v=i62jmLC15qQ

import {mailgunAuth} from "../../imports/ui/config";

const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: mailgunAuth.api_key,
        domain: mailgunAuth.domain,
    }
};
let transporter = nodemailer.createTransport(nodemailMailgun(auth));
const mailOptions = {
    from: "Excited user <me@samples.mailgun.org>",
    to: 'vrjgik5@gmail.com',
    subject: "Welcome to my app!",
    text: "Text body is working"
};
/*
* To Ensure People can get an email, make sure to add yourself to the authorized recipient on MailGun
* https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients look for beta UI instruction
* */


// transporter.sendMail(mailOptions, (err, data)=>{
//     if (err){
//         console.log(err);
//     } else {
//         console.log('Message Sent');
//     }
// });
