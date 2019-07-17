import { Meteor } from 'meteor/meteor';
import '/imports/api/itineraries';
import './methods/itinerary';
import './methods/users';
import Itineraries from '../imports/api/itineraries';
import CurrentEvents from '../imports/api/CurrentEvents';
import EventDrawerApi from '../imports/api/EventDrawerApi';
import getEventsInDay from './../imports/api/getDayEvents';
import YelpAttractionsApi, { convertBusinessesToAttractions } from "../imports/api/YelpAttractionsApi";
import eventDrawerData from './PreLoadedEventDrawer';
import CalledDates from '../imports/api/CalledDates';
import './methods/email';

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

  let eventsToday = await getEventsInDay(new Date());
  for (event of eventsToday.events) {
    CurrentEvents.insert(event);
  }

  if (EventDrawerApi.find().count() === 0) {
    console.log(`EventDrawer is Empty. Added two user data`);
    for (let userData of eventDrawerData) {
      EventDrawerApi.insert(userData);
    }
  }

  let yelp = new YelpAttractionsApi();
  let res = await yelp.getTouristAttractionFromCoord(50, 49.2820, -123.1171);
  let attractions = convertBusinessesToAttractions(res);
  for (let attraction of attractions) {
    CurrentEvents.insert(attraction);
  }
  console.log(`Current Events has less than 30 items. Added ${attractions.length} events from Yelp[`);

});




