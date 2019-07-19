import {Meteor} from "meteor/meteor";
import Mailgun from "../../imports/api/Mailgun";

Meteor.methods({
    // EFFECTS: send an itinerary as an email thru the server
    'emailItinerary': function (from, to, subject, html) {
        let mailgun = new Mailgun();
        mailgun.setMailOptionsWithHtml(from, to, subject, html);
        mailgun.sendMail()
            .then(() => {
                console.log(`${from} has sent an itinerary to ${to}: subject: ${subject}`);
            })
            .catch((err)=>{
                console.log(err);
            })
        ;
    }
});
