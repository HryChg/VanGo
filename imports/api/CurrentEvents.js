import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import getDayEvents from './clientEvents';

const CurrentEvents = new Mongo.Collection('currentEvents');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('currentEvents', function () {
        return CurrentEvents.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('currentEvents');
}

// Meteor.methods({
//     'updateEvents': function (date) {
//         CurrentEvents.remove({});
//         var newEvents = await getEventsInDay(date);
//         for (event of newEvents.events) {
//             CurrentEvents.insert(event)
//         }
//     }
// });

function makeMethod(name, fn) {
  Meteor.methods({ [name]: fn });

  return (...args) => {
    Meteor.call(name, ...args);
  };
}

const updateEvents = makeMethod('updateEC', async function (date) {
    CurrentEvents.remove({});
    var newEvents = await getDayEvents(date);
    for (event of newEvents.events) {
        CurrentEvents.insert(event)
    }
});
//
export { updateEvents };

export default CurrentEvents;
