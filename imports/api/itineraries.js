//Reference: https://www.youtube.com/watch?v=eNxuaTGq4Qk
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Itineraries = new Mongo.Collection('itineraries');

if (Meteor.isServer) {
    Meteor.publish('itineraries', function() {
        return Itineraries.find();
    });
    Meteor.publish('userItineraries', function() {
        return Itineraries.find({user: this.userId});
    });
}

export default Itineraries;
