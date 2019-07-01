import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const CurrentEvents = new Mongo.Collection('events');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('events', function() {
        return CurrentEvents.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('events');
}

export default CurrentEvents;
