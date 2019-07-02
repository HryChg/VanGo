import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Events = new Mongo.Collection('events');
// DatePicker change date -> onclick -> update SelectedDate & currEvents
// how to incorporate react here? or make call to yelp api?
// 

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('events', function() {
        return Events.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('events');
}