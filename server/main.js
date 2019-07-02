import { Meteor } from 'meteor/meteor';
import '/imports/api/itineraries';
import './methods/itinerary';
import Itineraries from '../imports/api/itineraries';
import CurrentEvents from '../imports/api/CurrentEvents';
import EventDrawerApi from '../imports/api/EventDrawerApi';
import PreLoadedEvents from './PreLoadedEvents';
import getEventsInDay from './../imports/api/getDayEvents';

let event1 = {
  id: 1,
  name: 'Canada Place',
  start_time: new Date('June 13, 2019 09:00:00'),
  end_time: new Date('May 13, 2020 05:00:00'),
  price: 20,
  latitude: 49.2888,
  longitude: -123.1111,
  link: 'https://www.canadaplace.ca/',
  category: 'Sightseeing',
  type: 'Attraction',
  description: 'Canada Place is a building situated on the Burrard Inlet waterfront of Vancouver, British Columbia. It is the home of the Vancouver Convention Centre, the Pan Pacific Vancouver Hotel, Vancouver\'s World Trade Centre, and the virtual flight ride FlyOver Canada.'
};
let event2 = {
  id: 2,
  name: 'Downtown Vancouver',
  start_time: new Date('June 13, 2019 09:00:00'),
  end_time: new Date('June 15, 2019 05:00:00'),
  price: 50,
  latitude: 49.2820,
  longitude: -123.1171,
  link: 'https://vancouver.ca/news-calendar/downtown.aspx',
  category: 'Sightseeing',
  type: 'Attraction',
  description: 'Downtown is known for a buzzing nightlife scene on neon-lit Granville Street, with raucous bars, clubs, and live bands at the art deco Commodore Ballroom. By day, it’s a busy shopping hub of chain and luxury boutiques, plus high-end department stores in the CF Pacific Centre mall. Food trucks and casual lunch spots dot the area, and cruise liners depart from Canada Place, a terminal designed to look like a ship.'
};
let event3 = {
  id: 3,
  name: 'Sunset Beach',
  start_time: new Date('February 10, 2019 09:00:00'),
  end_time: new Date('February 13, 2019 05:00:00'),
  price: 33,
  latitude: 49.2799,
  longitude: -123.1387,
  link: 'https://vancouver.ca/parks-recreation-culture/sunset-beach.aspx',
  category: 'Sightseeing',
  type: 'Attraction',
  description: 'Sunset Beach is situated in the West End near the Burrard Street Bridge and Vancouver International Hostel. The Vancouver Aquatic Centre lies at the East end of Sunset beach right next to the North end of Burrard Street Bridge. The beach has lifeguards on duty in the warm months.'
};
let event4 = {
  id: 4,
  name: 'Vancouver Art Gallery',
  start_time: new Date('May 13, 2019 09:00:00'),
  end_time: new Date('June 27, 2019 05:00:00'),
  price: 99,
  latitude: 49.28287695,
  longitude: -123.1205638545168,
  link: 'http://vanartgallery.bc.ca/index.html',
  category: 'Sightseeing',
  type: 'Attraction',
  description: 'The Vancouver Art Gallery is the fifth-largest art gallery in Canada, and the largest in Western Canada. It is located at 750 Hornby Street in Vancouver, British Columbia.'
};
let event5 = {
  id: 5,
  name: 'West End',
  start_time: new Date('June 10, 2019 09:00:00'),
  end_time: new Date('June 17, 2019 05:00:00'),
  price: 0,
  latitude: 49.2856,
  longitude: -123.1306,
  link: 'https://www.tourismvancouver.com/vancouver/neighbourhoods/west-end/',
  category: 'Sightseeing',
  type: 'Attraction',
  description: 'Mostly residential, the easygoing West End offers gay bars in Davie Village, chic fashion stores on Robson Street, and diverse dining ranging from ramen shops to seafood grills. It’s also the gateway to vast Stanley Park, known for its forested trails and Seawall waterfront path. The area’s public art includes the A-maze-ing Laughter sculpture, featuring 14 cast-bronze figures, and the Inukshuk, a stone Inuit statue.'
};
let event6 = {
  id: 6,
  name: 'Strawberry Festival',
  start_time: new Date('June 22, 2019 13:00:00'),
  end_time: new Date('June 22, 2019 16:00:00'),
  price: 0,
  latitude: 49.289680,
  longitude: -123.136950,
  link: 'https://www.todocanada.ca/city/vancouver/event/strawberry-festival-2/',
  category: 'Food',
  type: 'Event',
  description: 'Our annual Strawberry Festival is always lots of fun for the whole family! We have musical performances, a bouncy castle, horse-drawn carriage rides, activities for all ages and, of course, we’ll be selling delicious strawberry shortcakes!'
};
let event7 = {
  id: 7,
  name: 'Butterflies – Experience the Transformation - Vancouver Aquarium',
  start_time: new Date('May 13, 2019 09:00:00'),
  end_time: new Date('September 2, 2019 17:00:00'),
  price: 38,
  latitude: 49.300430,
  longitude: -123.127910,
  link: 'https://www.todocanada.ca/city/vancouver/event/strawberry-festival-2/',
  category: 'Sightseeing',
  type: 'Event',
  description: 'Immerse yourself in the beautiful world of butterflies at the Vancouver Aquarium, from May to September, 2019. The Graham Amazon Gallery has been transformed to become home to several species of beautiful butterflies, all the way from Costa Rica.'
};

// TODO: This will need to be moved into a handleSubmit
// https://github.com/meteor/simple-todos-react/commit/39a066815149de6a1b327fd389278e3c2da93e60
function insertItineraries(events, date) {
  Itineraries.insert({
    events: events,
    date: date,
  });
}

Meteor.startup(async () => {
  async function loadEvents() {
    let eventsToday = await getEventsInDay(new Date());
    console.log('scraped events: ' + eventsToday)
    // return Promise.resolve(eventsToday)
    return eventsToday;
  }

  // loadEvents().then(res => console.log('resolved promise: ' + res))

  if (Itineraries.find().count() === 0) {
    insertItineraries([event1, event2, event3], "Jan 12, 2019");
    insertItineraries([event4, event5, event6], "Jan 13, 2019");
  }

  if (CurrentEvents.find().count() === 0) {
    for (let event of PreLoadedEvents) {
      CurrentEvents.insert(event);
    }
    console.log(`The Current Events is empty.  Will Preload with new Events. `);
  }

  if (EventDrawerApi.find().count() === 0) {
    console.log(`EventDrawer is Empty`);
  }
});



