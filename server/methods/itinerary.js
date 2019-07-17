import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';
import EventDrawerApi from '../../imports/api/EventDrawerApi';

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
            items: itinerary.items, 
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
    // EFFECTS: deletes items stored in current event drawer for given id
    //          and overwrites the data with selected itinerary items
    'updateItinerary': function(id) {
        EventDrawerApi.remove({_id: id}, () => {
            let items = Itineraries.find({_id: id}, {fields: {items: 1}});
            EventDrawerApi.insert({
                id: itinerary.id,
                name: itinerary.name,
                items: itinerary.items, 
                date: itinerary.date,
                user: Meteor.userId()
            }, (err) => {
                if (err) throw new Meteor.Error(err, err);
            });
        });
        // Add itinerary to Event Drawer
        console.log("calling updateItinerary");
        // Itineraries.update({
        //     _id: id
        // }, {
        //     // What needs to be updated
        // }, (err) => {
        //     if (err) throw new Meteor.Error(err, err);
        // });
    }
});

