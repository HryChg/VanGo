import {Meteor} from 'meteor/meteor';
import '/imports/api/itineraries';
import '/imports/api/MailgunEmailStats';
import './methods/itinerary';
import './methods/users';
import './methods/email';
import CurrentEvents from '../imports/api/CurrentEvents';
import Attractions from '../imports/api/Attractions';
import getEventsInDay from './../imports/api/getDayEvents';
import YelpAttractionsApi, {convertBusinessesToAttractions} from "../imports/api/YelpAttractionsApi";


Meteor.startup(async () => {
    Attractions.remove({});
    console.log(`Cleared out Attractions collection`);

    let yelp = new YelpAttractionsApi();
    let res = await yelp.getTouristAttractionFromCoord(50, 49.2820, -123.1171);
    let attractions = convertBusinessesToAttractions(res);
    for (let attraction of attractions) {
        Attractions.insert(attraction);
    }
    console.log(`Added ${attractions.length} attraction from Yelp`);
});




