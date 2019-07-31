import { Meteor } from 'meteor/meteor';
import Itineraries from '../../imports/api/itineraries';
import EventDrawerApi from '../../imports/api/EventDrawerApi';

Meteor.methods({
    // EFFECTS: gets itinerary
    'fetchItineraries': async () => {
        return await Itineraries.find({user: Meteor.userId()}).fetch();
    },

    // EFFECTS: adds itinerary to collection; throws error if not logged in
    //          if itinerary already exists, update itinerary instead
    'saveItinerary': function(itinerary, editing) {
        if (!Meteor.userId()) {
            const err = 'Not Authorized: Must be logged in to save itinerary.';
            throw new Meteor.Error(err, err);
        }
        if (editing) {
            Itineraries.update({
                _id: itinerary._id
            },
            {
                _id: itinerary._id,
                name: itinerary.name,
                items: itinerary.items, 
                date: itinerary.date,
                user: Meteor.userId()
            },
            (err) => {if (err) throw new Meteor.Error(err, err)});   
        } else {
            Itineraries.insert({
                _id: itinerary._id,
                name: itinerary.name,
                items: itinerary.items, 
                date: itinerary.date,
                user: Meteor.userId()
            }, (err) => {if (err) throw new Meteor.Error(err, err)});   
        }
    },

    // EFFECTS: deletes an itinerary with given id; does nothing if ID not found
    'deleteItinerary': function(id) {
        Itineraries.remove({
            _id: id
        }, (err) => {
            if (err) throw new Meteor.Error(err, err);
        })
    },

    // EFFECTS: finds given itinerary and adds it to user's event drawer
    'updateItinerary': async function(id) {
        if (!id) return;
        let itinerary = await Itineraries.findOne({_id: id});
        await EventDrawerApi.update({
            user: itinerary.user
        },{
            $set: {itineraryEdit: itinerary}
        }, (err) => {
            if (err) throw new Meteor.Error(err, err);
        });
    }
});
