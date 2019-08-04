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
            console.log(date)
            // var dbEvents = CurrentEvents.find();
            // for (event of eventsToday.events) {
            //     CurrentEvents.insert(event);
            //   }
            await CurrentEvents.remove({type: "Event"});
            var newEvents = await getEventsInDay(date);
            for (event of newEvents.events) {
                CurrentEvents.insert(event)
            }
            return await CurrentEvents.find().fetch();
        }
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('currentEvents');
}

export { updateEvents };

export default CurrentEvents;
