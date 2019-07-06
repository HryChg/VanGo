// Allow for insertion on EventDrawerApi
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588


import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const EventDrawerApi = new Mongo.Collection('eventDrawer');


export const getAnonAccountID = async () => {
    let anonDrawer = EventDrawerApi.findOne({user: 'anon'});
    if (!anonDrawer){
        let anonAccount = {
            user: 'anon',
            items:[]
        };
        let _id = await EventDrawerApi.insert(anonAccount);
        return _id;
    }
    return anonDrawer._id;
};

const updateAnonAccount = async (item) => {
    try {
        let anonDrawerID = getAnonAccountID();
        let anonDrawer = EventDrawerApi.findOne({_id: anonDrawerID});
        let updatedDrawer = anonDrawer.items.push(item);
        return await EventDrawerApi.update({_id: anonDrawerID}, {updatedDrawer});
    } catch (err) {
        console.log(`Error occurred when saving to anonymous account: ${err.message}`);
    }
};

const getUserAccountID = async () => {
    let userDrawerID = EventDrawerApi.findOne({user: Meteor.userId()});
    if (!userDrawerID){
        let userAccount = {
            user: Meteor.userId(),
            items:[]
        };
        let _id = await EventDrawerApi.insert(userAccount);
        return _id;
    }
    return userDrawerID._id;

};

const updateExistingAccount = async (item) => {
    let userDrawerID = getUserAccountID();
    try {
        let userDrawer = EventDrawerApi.findOne({_id: userDrawerID});
        let updatedDrawer = userDrawer.items.push(item);
        return await EventDrawerApi.update({_id: userDrawerID}, {updatedDrawer});
    } catch (err) {
        console.log(`Error occurred when saving to account  ${userDrawerID}: ${err.message}`);
    }
};


// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('eventDrawer', function () {
        return EventDrawerApi.find();
    });


    Meteor.methods({
        getEventsOnUserID: async () => {
            let accountID;
            if (Meteor.userId()){ // if logged in
                accountID = getAnonAccountID();
            } else {
                accountID = getUserAccountID();
            }
            return await EventDrawerApi.findOne({_id: accountID})
        },



        saveEventToDrawer: async (eventToBeSaved) => {
            try {
                // console.log(`the current user id is ${Meteor.userId()}`);
                // console.log(`the current user first email is ${Meteor.user().emails[0].address}`);
                // console.log(`the current user name is ${Meteor.user().profile.name}`);

                return await EventDrawerApi.insert(eventToBeSaved);
            } catch (err) {
                throw new Meteor.Error("Unable to insert", `${err.message}`);
            }
        },
        removeEventFromDrawer: async (eventID) => {
            try {
                return await EventDrawerApi.remove(eventID);
            } catch (err) {
                throw new Meteor.Error("Unable to remove this event", `${err.message}`);
            }
        }
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('eventDrawer');
}

export default EventDrawerApi;
