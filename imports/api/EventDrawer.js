// Allow for insertion on EventDrawer
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588



import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const EventDrawer = new Mongo.Collection('eventDrawer');

// allowed operations on Event Drawer
EventDrawer.allow({
    insert: function (doc, callback) {
        // TODO: will have to allow for user auth in the future, check example in link aboved
        return true;
    },
});



// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('eventDrawer', function() {
        return EventDrawer.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('eventDrawer');
}

export default EventDrawer;
