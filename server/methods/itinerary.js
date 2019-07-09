import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';

Meteor.methods({
    // EFFECTS: adds itinerary to collection; throws error if not logged in
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
            if (err) throw new Meteor.Error(err, err);
        });
    },
    // EFFECTS: deletes an itinerary with given id; does nothing if ID not found
    'deleteItinerary': function(id) {
        Itineraries.remove({
            _id: id
        }, (err) => {
            if (err) throw new Meteor.Error(err, err);
        })
    },
    // Template for an update
    'updateItinerary': function(id) {
        Itineraries.update({
            _id: id
        }, {
            // What needs to be updated
        }, (err) => {
            if (err) throw new Meteor.Error(err, err);
        })
    }
});