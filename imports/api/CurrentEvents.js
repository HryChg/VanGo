import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import getEventsInDay from './getDayEvents';
import YelpAttractionsApi, { convertBusinessesToAttractions } from "../api/YelpAttractionsApi";

const CurrentEvents = new Mongo.Collection('currentEvents');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('currentEvents', function () {
        return CurrentEvents.find();
    });

    Meteor.methods({
        'getCurrentEvents': async ()=>{
            return await CurrentEvents.find().fetch();
        },

        'updateEvents': async (date) => {
            // var dbEvents = CurrentEvents.find();
            // for (event of eventsToday.events) {
            //     CurrentEvents.insert(event);
            //   }
            CurrentEvents.remove({type: "Event"});
            var newEvents = await getEventsInDay(date);
            for (event of newEvents.events) {
                CurrentEvents.insert(event)
            }

            // let yelp = new YelpAttractionsApi();
            // let res = await yelp.getTouristAttractionFromCoord(50, 49.2820, -123.1171);
            // let attractions = convertBusinessesToAttractions(res);
            // for (let attraction of attractions) {
            //     CurrentEvents.insert(attraction);
            // }
        }
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('currentEvents');
}

export { updateEvents };

export default CurrentEvents;
