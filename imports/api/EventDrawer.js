import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const EventDrawer = new Mongo.Collection('eventDrawer');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('eventDrawer', function() {
        return EventDrawer.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('eventDrawer');
}

export default EventDrawer;
