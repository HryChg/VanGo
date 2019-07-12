// Allow for insertion on EventDrawerApi
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const EventDrawerApi = new Mongo.Collection('eventDrawer');


// EFFECTS: return the _id of an anonymous user in the event drawer.
//          If not such document exist in eventDrawerCollection, create one and return its _id
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
            items: []
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
    Meteor.publish('eventDrawer', function () {
        return EventDrawerApi.find();
    });

    Meteor.methods({
        // EFFECTS: initialize eventDrawer so that that it has the anonymous userDrawer or the userDrawer for current user ready
        initializeEventDrawerApi: async () => {
            return await getDrawerID();
        },

        // EFFECTS: save the item to user drawer based on the current Drawer ID. Repeated Items will not be added
        saveToCurrentUserDrawer: async (itemToBeSaved) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            let items = userData.items;

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
        deleteFromCurrentUserDrawer: async (itemToBeDeleted) => {
            let accountID = await getDrawerID();
            let userData = await EventDrawerApi.findOne({_id: accountID});
            let items = userData.items;

            if (!containsItem(items, itemToBeDeleted)) {
                throw new Meteor.Error(`deleteFromCurrentUserData(): item "${itemToBeDeleted.name}}" is NOT in user's event drawer. No action taken.`);
            } else {
                let newItems = items.filter((item) => {
                    return item._id !== itemToBeDeleted._id
                });
                let newUserData = {
                    _id: userData._id,
                    user: userData.user,
                    items: newItems
                };
                EventDrawerApi.update({_id: accountID}, newUserData);
                console.log(`deleteFromCurrentUserData(): item "${itemToBeDeleted.name}}" deleted from user drawer`);
                return;
            }
        }
    });
}

export default EventDrawerApi;
