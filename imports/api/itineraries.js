import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Itineraries = new Mongo.Collection('itineraries');

// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('itineraries', function() {
        return Itineraries.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('itineraries');
}