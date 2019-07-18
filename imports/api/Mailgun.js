// Link to Combine MailGun and NodeMailer
// https://www.youtube.com/watch?v=i62jmLC15qQ
import nodemailer from 'nodemailer';
import nodemailMailgun from 'nodemailer-mailgun-transport';
import {mailgunAuth} from "../../imports/ui/config";

export default class MailGun {
    // EFFECTS: Create a Node Mailer Transporter that incorporates MailGun Api
    constructor(){
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
    setMailOptions(from, to, subject, text){
        this.mailOptions = {
            from,
            to,
            subject,
            text
        }
    }

    // REQUIRES: this.mailOptions must be set
    // EFFECTS: Send the mail. Log error if necessary.
    async sendMail(){
        try{
            await this.transporter.sendMail(this.mailOptions);
            console.log(`Message Sent to ${this.mailOptions.to}`);
        } catch (err) {
            console.log(err);
        }
    }
}

// Sample Usage //
// let mailGun = new MailGun();
// let from = "Excited user <me@samples.mailgun.org>";
// let to = 'vrjgik5@gmail.com';
// let subject = "Welcome to my app!";
// let text = "Text body is working";
// mailGun.setMailOptions(from, to, subject, text);
// mailGun.sendMail().then(
//     ()=>{
//         console.log('Done');
//     }
// );
