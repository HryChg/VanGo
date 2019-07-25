// Allow for insertion on EventDrawerApi
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const EventDrawerApi = new Mongo.Collection('eventDrawer');


// EFFECTS: return the _id of an anonymous user in the event drawer.
//          If not such document exist in eventDrawerCollection, create one and return its _id
// TODO: This might cause issues if multiple anon users are concurrently on the app !!!
const getAnonDrawerID = async () => {
    let anonDrawer = EventDrawerApi.findOne({user: 'anon'});
    if (!anonDrawer) {
        let anonDrawer = {
            user: 'anon',
            items: []
        };
        console.log(`EventDrawerApi: no anonymous drawer found. Will insert one into collection`);
        return await EventDrawerApi.insert(anonDrawer);
    }
    return anonDrawer._id;
};

// EFFECTS: return the document _id for the user drawer related to currently logged-in user
const getUserDrawerID = async () => {
    let userDrawerID = EventDrawerApi.findOne({user: Meteor.userId()});
    if (!userDrawerID) {
        let userDrawer = {
            user: Meteor.userId(),
            items: [],
            itineraryEdit: null
        };
        console.log(`EventDrawerApi: drawer for user ${Meteor.userId()} NOT found. Will insert one into collection`);
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
    Meteor.publish('userEventDrawer', function (user) {
        if (user) {
            return EventDrawerApi.find({user: this.userId});
        } else {
            return EventDrawerApi.find({user: 'anon'});
        }
    });

    Meteor.methods({
        // EFFECTS: initialize eventDrawer so that that it has the anonymous userDrawer or the userDrawer for current user ready
        initializeEventDrawerApi: async () => {
            return await getDrawerID();
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
                throw new Meteor.Error(`saveToCurrentUserData(): item "${itemToBeSaved.name}}" is already in user's event drawer. Will not be added again`);
            } else {
                items.push(itemToBeSaved);
                console.log(`saveToCurrentUserData(): item "${itemToBeSaved.name}}" added to user drawer`);
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
                throw new Meteor.Error(`deleteFromCurrentUserData(): item "${itemToBeDeleted.name}}" is NOT in user's event drawer. No action taken.`);
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
                console.log(`deleteFromCurrentUserData(): item "${itemToBeDeleted.name}}" deleted from user drawer`);
                return;
            }
        },

        // EFFECTS: Clear out the items in current user's drawer, not itineraryEdit
        clearDrawer: async () => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            userData.items = [];
            EventDrawerApi.update({_id: accountID}, userData);
            console.log(`Due to user choosing a new date in calendar, the user drawer is cleared out`)
        },

        // EFFECTS: Overwrites existing drawer data with selected itinerary
        saveItineraryToDrawer: async (itinerary) => {
            let userData = await EventDrawerApi.update({_id: this.userId}, itinerary);
            return;
        }
    });
}

export default EventDrawerApi;
