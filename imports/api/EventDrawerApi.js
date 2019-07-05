// Allow for insertion on EventDrawerApi
// https://stackoverflow.com/questions/12756863/meteor-mongo-insert-failed-access-denied/33788588


import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const EventDrawerApi = new Mongo.Collection('eventDrawer');



// TODO: This will need some restrictions
if (Meteor.isServer) {
    Meteor.publish('eventDrawer', function () {
        return EventDrawerApi.find();
    });


    Meteor.methods({
        // TODO Needs Security Measure for these methods, e.g. checking this.userID
        saveEventToDrawer: async (eventToBeSaved) => {
            try {
                console.log(`the current user id is ${Meteor.userId()}`);
                console.log(`the current user first email is ${Meteor.user().emails[0].address}`);
                console.log(`the current user name is ${Meteor.user().profile.name}`);

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
