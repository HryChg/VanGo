import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const CurrentEvents = new Mongo.Collection('events');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('currenEvents', function() {
        return CurrentEvents.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('currenEvents');
}

export default CurrentEvents;
