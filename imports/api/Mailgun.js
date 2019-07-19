// Link to Combine MailGun and NodeMailer
// https://www.youtube.com/watch?v=i62jmLC15qQ
import nodemailer from 'nodemailer';
import nodemailMailgun from 'nodemailer-mailgun-transport';
import {mailgunAuth} from "../../imports/ui/config";

export default class MailGun {
    // EFFECTS: Create a Node Mailer Transporter that incorporates MailGun Api
    constructor() {
        let auth = {
            auth: {
                api_key: mailgunAuth.api_key,
                domain: mailgunAuth.domain,
            }
        };
        this.transporter = nodemailer.createTransport(nodemailMailgun(auth));
    }


    /*
    * To Ensure People can get an email, make sure to add yourself to the authorized recipient on MailGun
    * https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients look for beta UI instruction
    * */
    // REQUIRES: "to" must be an authorized recipient on MailGun Dashboard as the current mailgun api is meant for testing
    // EFFECTS: Set the sender, reciepient, subject, and body
    // MODIFIES: this
    setMailOptionsWithText(from, to, subject, text) {
        this.mailOptions = {
            from,
            to,
            subject,
            text
        }
    }

    // REQUIRES: "to" must be an authorized recipient on MailGun Dashboard as the current mailgun api is meant for testing
    // EFFECTS: Set the sender, reciepient, subject, and htmlString
    // MODIFIES: this
    setMailOptionsWithHtml(from, to, subject, html) {
        this.mailOptions = {
            from,
            to,
            subject,
            html
        }
    }

    // REQUIRES: this.mailOptions must be set
    // EFFECTS: Send the mail. Log error if necessary.
    async sendMail() {
        try {
            let info = await this.transporter.sendMail(this.mailOptions);
            return info;
        } catch (err) {
            console.log(err);
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Sample Usage with sending just text
////////////////////////////////////////////////////////////////////////

// let itin = {
//     "_id": "jy98ffd3",
//     "name": "Temp1",
//     "date": "Thu Jul 18 2019",
//     "user": "mwFESCgvyjEkqApX2"
// };
// let mailGun = new MailGun();
// let from = "Excited user <me@samples.mailgun.org>";
// let to = 'vrjgik5@gmail.com';
// let subject = "Welcome to my app!";
// let text = JSON.stringify(itin, null, 2); // space level 2, prettify the json string
// mailGun.setMailOptions(from, to, subject, text);
// mailGun.sendMail().then(
//     ()=>{
//         console.log('mailGun.sendMail() Done');
//     }
// );


////////////////////////////////////////////////////////////////////////
// Sample Usage with HTML Instead
////////////////////////////////////////////////////////////////////////

import {emailItineraryTemplate} from "./ItineraryEmailTemplate";


let mailGun = new MailGun();
let from = "Excited user <me@samples.mailgun.org>";
let to = 'vrjgik5@gmail.com';
let subject = "Welcome to my app!";
let html = emailItineraryTemplate;
mailGun.setMailOptionsWithHtml(from, to, subject, html);
// mailGun.sendMail().then(
//     ()=>{
//         console.log('mailGun.sendMail() Done');
//     }
// );
