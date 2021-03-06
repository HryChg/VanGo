// Allow for insertion on EventDrawerApi
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {getToday} from '../util/util.js';

const EventDrawerApi = new Mongo.Collection('eventDrawer');


// EFFECTS: return the _id of an anonymous user in the event drawer.
//          If not such document exist in eventDrawerCollection, create one and return its _id
// TODO: This might cause issues if multiple anon users are concurrently on the app !!!
const getAnonDrawerID = async () => {
    let anonDrawer = await EventDrawerApi.findOne({user: 'anon'});
    if (!anonDrawer) {
        let anonDrawer = {
            user: 'anon',
            items: [],
            date: getToday()
        };
        console.log(`EventDrawerApi: no anonymous drawer found. Will insert one into collection`);
        return await EventDrawerApi.insert(anonDrawer);
    }
    return anonDrawer._id;
};

// EFFECTS: return the document _id for the user drawer related to currently logged-in user
const getUserDrawerID = async () => {
    let userDrawerID = await EventDrawerApi.findOne({user: Meteor.userId()});
    if (!userDrawerID) {
        let userDrawer = {
            user: Meteor.userId(),
            items: [],
            itineraryEdit: null,
            date: getToday()
        };
        console.log(`Drawer for user ${Meteor.userId()} NOT found. Will insert one into collection`);
        return await EventDrawerApi.insert(userDrawer);
    }
    return userDrawerID._id;

};

// EFFECTS: return an drawer ID depending on whether a user is logged in.
async function getDrawerID() {
    if (Meteor.userId() === null) {
        return await getAnonDrawerID();
    } else {
        return await getUserDrawerID();
    }
}

// EFFECTS: check if items contains an element with the same "name" as item
function containsItem(items, item) {
    for (let i of items) {
        if (i.name === item.name)
            return true;
    }
    return false;
}

if (Meteor.isServer) {

    Meteor.methods({
        // EFFECTS: initialize eventDrawer so that that it has the anonymous userDrawer or the userDrawer for current user ready
        initializeEventDrawerApi: async () => {
            return await getDrawerID();
        },

        // EFFECTS: loads event
        getEventDrawer: async () => {
            try{
                let drawerId = await getDrawerID();
                return await EventDrawerApi.findOne({_id: drawerId});
            } catch (e) {
                console.error(e.message);
            }
        },

        // EFFECTS: save the item to user drawer based on the current Drawer ID. Repeated Items will not be added
        saveToCurrentUserDrawer: async (itemToBeSaved, editing) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            let items;
            if (editing) {
                items = userData.itineraryEdit.items;
            } else {
                items = userData.items;
            }

            if (containsItem(items, itemToBeSaved)) {
                let message = `"${itemToBeSaved.name}" has already been saved!`
                throw new Meteor.Error(message, message);
            } else {
                items.push(itemToBeSaved);
                console.log(`"${itemToBeSaved.name}" added to user drawer`);
                EventDrawerApi.update({_id: accountID}, userData);
                return itemToBeSaved._id;
            }
        },

        // EFFECTS: deleted the item from userDrawer based on the current Drawer ID. If item does not already exist, an error is thrown.
        //          if editing, changes are made to selected itinerary items
        deleteFromCurrentUserDrawer: async (itemToBeDeleted, editing) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            let items;
            if (editing) {
                items = userData.itineraryEdit.items;
            } else {
                items = userData.items;
            }

            if (!containsItem(items, itemToBeDeleted)) {
                let message = `"${itemToBeDeleted.name}}" NOT FOUND.`;
                throw new Meteor.Error(message, message);
            } else {
                let newItems = items.filter((item) => {
                    return item._id !== itemToBeDeleted._id
                });
                if (editing) {
                    let newItineraryEdit = {
                        _id: userData.itineraryEdit._id,
                        name: userData.itineraryEdit.name,
                        items: newItems,
                        date: userData.itineraryEdit.date,
                        user: userData.itineraryEdit.user
                    }
                    EventDrawerApi.update({_id: accountID}, {$set: {itineraryEdit: newItineraryEdit}});
                } else {
                    EventDrawerApi.update({_id: accountID}, {$set: {items: newItems}});
                }
                console.log(`"${itemToBeDeleted.name}" deleted from user drawer`);
                return;
            }
        },

        // EFFECTS: Clear out the items in current user's drawer, not itineraryEdit
        clearDrawer: async (date) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            userData.items = [];
            userData.itineraryEdit ? userData.itineraryEdit = null : null;
            userData.date ? userData.date = date: null;
            EventDrawerApi.update({_id: accountID}, userData);
            console.log(`Due to user choosing a new date in calendar, the user drawer is cleared out`)
        },

        // EFFECTS: Overwrites existing drawer data with selected itinerary
        saveItineraryToDrawer: async (itinerary) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.update({_id: accountID}, itinerary);
        },

        updateDrawerDate: async (date) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.update({_id: accountID}, {$set: {date: date}});
        },

        getDrawerDate: async () => {
            let accountID = await getDrawerID();
            return await EventDrawerApi.findOne({_id: accountID}, {fields: {date: 1}}, (err, res) => {
                console.log(err)
            });
        }
    });
}

export default EventDrawerApi;
