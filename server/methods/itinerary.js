import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';

Meteor.methods({
    'saveItinerary': function(itinerary) {
        if (!Meteor.userId()) {
            const err = 'Not Authorized: Must be logged in to save itinerary.';
            throw new Meteor.Error(err, err);
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