import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const CurrentEvents = new Mongo.Collection('currentEvents');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('currentEvents', function() {
        return CurrentEvents.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('currentEvents');
}

export default CurrentEvents;
