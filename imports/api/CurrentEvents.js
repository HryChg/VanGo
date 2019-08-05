import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import getEventsInDay from './getDayEvents';
import { parseDate, isString } from '../util/util';

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
            if (!date) return [];
            let newDate = isString(date) ? parseDate(date) : date; 
            await CurrentEvents.remove({type: "Event"});
            var newEvents = await getEventsInDay(newDate);
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
