import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import getEventsInDay from './getDayEvents';
import { parseDate, isString } from '../util/util';

const CurrentEvents = new Mongo.Collection('currentEvents');

if (Meteor.isServer) {
    Meteor.publish('currentEvents', function () {
        return CurrentEvents.find();
    });

    Meteor.methods({
        'getCurrentEvents': async ()=>{
            return await CurrentEvents.find().fetch();
        },

        'updateEvents': async (date) => {
            if (!date) return [];
            let newDate = isString(date) ? parseDate(date) : date; 
            var newEvents = await getEventsInDay(newDate);
            return newEvents.events;
        }
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('currentEvents');
}

export { updateEvents };

export default CurrentEvents;
