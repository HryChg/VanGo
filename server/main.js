import {Meteor} from 'meteor/meteor';
import '/imports/api/itineraries';
import './methods/itinerary';
import './methods/users';
import './methods/email';
import Itineraries from '../imports/api/itineraries';
import CurrentEvents from '../imports/api/CurrentEvents';
import getEventsInDay from './../imports/api/getDayEvents';
import YelpAttractionsApi, {convertBusinessesToAttractions} from "../imports/api/YelpAttractionsApi";
import '../imports/api/Mailgun';
import MailGun from "../imports/api/Mailgun";

// TODO: This will need to be moved into a handleSubmit
// https://github.com/meteor/simple-todos-react/commit/39a066815149de6a1b327fd389278e3c2da93e60
function insertItineraries(events, date) {
    Itineraries.insert({
        events: events,
        date: date,
    });
}


const sendEmail = async () => {
    let itin = {
        "_id": "jy98ffd3",
        "name": "Temp1",
        "items": [
            {
                "_id": "NB5v5uZY56WLAKmit",
                "name": "Bill Reid Gallery: Language Matters -- June 19-September 16, 2019",
                "start_time": "2019-06-27T11:00:00-07:00",
                "end_time": "2019-07-27T17:00:00-07:00",
                "price": null,
                "free": false,
                "location": {
                    "address1": "639 Hornby Street",
                    "address2": "",
                    "address3": "",
                    "city": "Vancouver",
                    "zip_code": "V6C 2G3",
                    "country": "CA",
                    "state": "BC",
                    "display_address": [
                        "639 Hornby Street",
                        "Vancouver, BC V6C 2G3",
                        "Canada"
                    ],
                    "cross_streets": ""
                },
                "latitude": 49.2845871,
                "longitude": -123.1194282,
                "link": "https://www.yelp.com/events/vancouver-bill-reid-gallery-language-matters-june-19-september-16-2019?adjust_creative=4oRgfQ6rHoWhvQRa5T88mg&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=4oRgfQ6rHoWhvQRa5T88mg",
                "category": "visual-arts",
                "type": "Event",
                "description": "The Bill Reid Gallery of Northwest Coast Art presents Language Matters, an exhibition that brings awareness to the importance of Indigenous language..."
            }
        ],
        "date": "Thu Jul 18 2019",
    };
    let mailGun = new MailGun();
    let from = "Excited user <me@samples.mailgun.org>";
    let to = 'vrjgik5@gmail.com';
    let subject = "Welcome to my app!";
    let text = JSON.stringify(itin, null, 2); // space level 2, prettify the json string
    mailGun.setMailOptions(from, to, subject, text);

    try {
        let res = await mailGun.sendMail();
        console.log(`Message Sent to ${to}`);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

};


Meteor.startup(async () => {

    // await sendEmail();


    CurrentEvents.remove({});
    console.log(`clear out current events collection`);

    let eventsToday = await getEventsInDay(new Date());
    for (event of eventsToday.events) {
        CurrentEvents.insert(event);
    }
    console.log(`Added ${eventsToday.length} events from Yelp`);

    let yelp = new YelpAttractionsApi();
    let res = await yelp.getTouristAttractionFromCoord(50, 49.2820, -123.1171);
    let attractions = convertBusinessesToAttractions(res);
    for (let attraction of attractions) {
        CurrentEvents.insert(attraction);
    }
    console.log(`Added ${attractions.length} attraction from Yelp`);
});




