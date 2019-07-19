import {Meteor} from "meteor/meteor";
import Mailgun from "../../imports/api/Mailgun";

Meteor.methods({
    // EFFECTS: send an itinerary as an email thru the server
    'emailItinerary': function (from, to, subject, text) {
        let mailgun = new Mailgun();
        mailgun.setMailOptions(from, to, subject, text);
        mailgun.sendMail()
            .then(() => {
                console.log(`${from} has send an itinerary to ${to}: subject: ${subject}`);
            })
            .catch((err)=>{
                console.log(err);
            })
        ;
    }
});
