import {Meteor} from 'meteor/meteor';
import '/imports/api/itineraries';
import '/imports/api/MailgunEmailStats';
import './methods/itinerary';
import './methods/users';
import './methods/email';
import '../imports/api/CalledDates'; // DO NOT DELETE. Methods needed need to refactor I suppose?
import Itineraries from '../imports/api/itineraries';
import CurrentEvents from '../imports/api/CurrentEvents';
import getEventsInDay from './../imports/api/getDayEvents';
import YelpAttractionsApi, {convertBusinessesToAttractions} from "../imports/api/YelpAttractionsApi";


// TODO: This will need to be moved into a handleSubmit
// https://github.com/meteor/simple-todos-react/commit/39a066815149de6a1b327fd389278e3c2da93e60
function insertItineraries(events, date) {
    Itineraries.insert({
        events: events,
        date: date,
    });
}

Meteor.startup(async () => {
    CurrentEvents.remove({});
    console.log(`clear out current events collection`);

    let eventsToday = await getEventsInDay(new Date());
    for (event of eventsToday.events) {
        CurrentEvents.insert(event);
    }
    console.log(`Added ${eventsToday.events.length} events from Yelp`);

    let yelp = new YelpAttractionsApi();
    let res = await yelp.getTouristAttractionFromCoord(50, 49.2820, -123.1171);
    let attractions = convertBusinessesToAttractions(res);
    for (let attraction of attractions) {
        CurrentEvents.insert(attraction);
    }
    console.log(`Added ${attractions.length} attraction from Yelp`);
});




