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
    setMailOptions(from, to, subject, text) {
        this.mailOptions = {
            from,
            to,
            subject,
            text
        }
    }

    // REQUIRES: this.mailOptions must be set
    // EFFECTS: Send the mail. Log error if necessary.
    async sendMail() {
        try {
            await this.transporter.sendMail(this.mailOptions);
            console.log(`Message Sent to ${this.mailOptions.to}`);
        } catch (err) {
            console.log(err);
        }
    }
}

// Sample Usage //
// let itin = {
//     "_id": "jy98ffd3",
//     "name": "Temp1",
//     "items": [
//         {
//             "_id": "NB5v5uZY56WLAKmit",
//             "name": "Bill Reid Gallery: Language Matters -- June 19-September 16, 2019",
//             "start_time": "2019-06-27T11:00:00-07:00",
//             "end_time": "2019-07-27T17:00:00-07:00",
//             "price": null,
//             "free": false,
//             "location": {
//                 "address1": "639 Hornby Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Vancouver",
//                 "zip_code": "V6C 2G3",
//                 "country": "CA",
//                 "state": "BC",
//                 "display_address": [
//                     "639 Hornby Street",
//                     "Vancouver, BC V6C 2G3",
//                     "Canada"
//                 ],
//                 "cross_streets": ""
//             },
//             "latitude": 49.2845871,
//             "longitude": -123.1194282,
//             "link": "https://www.yelp.com/events/vancouver-bill-reid-gallery-language-matters-june-19-september-16-2019?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
//             "category": "visual-arts",
//             "type": "Event",
//             "description": "The Bill Reid Gallery of Northwest Coast Art presents Language Matters, an exhibition that brings awareness to the importance of Indigenous language..."
//         },
//         {
//             "_id": "gTYaPTWp9cXyL7iGX",
//             "name": "West End Summer Art Market",
//             "start_time": "2019-07-01T00:00:00-07:00",
//             "end_time": "2019-07-31T23:30:00-07:00",
//             "price": 0,
//             "free": true,
//             "location": {
//                 "address1": "1200 Bute Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Vancouver",
//                 "zip_code": "V6E 1N1",
//                 "country": "CA",
//                 "state": "BC",
//                 "display_address": [
//                     "1200 Bute St, Vancouver, BC V6E 1N1, Canada"
//                 ],
//                 "cross_streets": ""
//             },
//             "latitude": 49.2815324,
//             "longitude": -123.1333527,
//             "link": "https://www.yelp.com/events/vancouver-west-end-summer-art-market?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
//             "category": "festivals-fairs",
//             "type": "Event",
//             "description": "WE Arts is a community arts organization whose goal it is to connecting community through arts in Vancouver's West End. \nJoin us for fun, music, art and..."
//         },
//         {
//             "_id": "7mss9pbdtZ9bQfmyR",
//             "name": "Science World",
//             "start_time": null,
//             "end_time": null,
//             "price": 0,
//             "free": null,
//             "location": {
//                 "address1": "TELUS World of Science",
//                 "address2": "1455 Quebec Street",
//                 "address3": "",
//                 "city": "Vancouver",
//                 "zip_code": "V6A 3Z7",
//                 "country": "CA",
//                 "state": "BC",
//                 "display_address": [
//                     "TELUS World of Science",
//                     "1455 Quebec Street",
//                     "Vancouver, BC V6A 3Z7",
//                     "Canada"
//                 ]
//             },
//             "latitude": 49.2734872517579,
//             "longitude": -123.10337607853,
//             "link": "https://www.yelp.com/biz/science-world-vancouver-2?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
//             "category": "museums",
//             "type": "Attraction",
//             "description": null
//         }
//     ],
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
