import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';
import EventDrawerApi from '../../imports/api/EventDrawerApi';

Meteor.methods({
    // EFFECTS: adds itinerary to collection; throws error if not logged in
    //          if itinerary already exists, update itinerary instead
    'saveItinerary': function(itinerary) {
        if (!Meteor.userId()) {
            const err = 'Not Authorized: Must be logged in to save itinerary.';
            throw new Meteor.Error(err, err);
        }
        Itineraries.insert({
            _id: itinerary._id,
            name: itinerary.name,
            items: itinerary.items, 
            date: itinerary.date,
            user: Meteor.userId()
        }, (err) => {
            if (err.errmsg) {
                if (err.errmsg.includes("E11000 duplicate key error")) {
                    Itineraries.update({
                        _id: itinerary._id
                    },
                    {
                        name: itinerary.name,
                        items: itinerary.items, 
                        date: itinerary.date,
                        user: Meteor.userId()
                    },
                    (err) => {if (err) throw new Meteor.Error(err, err)});    
                }
            } else if (err) {
                throw new Meteor.Error(err, err);
            }
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
    //          and overwrites the data with selected itinerary
    'updateItinerary': function(id) {
        if (!id) return;
        EventDrawerApi.remove({_id: id}, () => {
            let itinerary = Itineraries.find({_id: id});
            console.log("id:   -----------------------") //TODO: For testing only
            console.log(id);
            console.log(itinerary);
            EventDrawerApi.insert(itinerary, (err) => {
                if (err) throw new Meteor.Error(err, err);
            });
        });
    }
});

