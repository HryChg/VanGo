import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';

Meteor.methods({
    'saveItinerary': function(itinerary) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not Authorized: Must be logged in to save itinerary.');
        }
        Itineraries.insert({
            id: itinerary.id,
            name: itinerary.name,
            events: itinerary.events, 
            date: itinerary.date,
            user: Meteor.userId()
        }, (err) => {
            if (err) console.log(err);
        });
    }
});