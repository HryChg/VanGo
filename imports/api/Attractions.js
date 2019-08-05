import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Attractions = new Mongo.Collection('attractions');

if (Meteor.isServer) {
    Meteor.methods({
        'getAttractions': async () => {
            return await Attractions.find().fetch();
        }
    });
}

export default Attractions;