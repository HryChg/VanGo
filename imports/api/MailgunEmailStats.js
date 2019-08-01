//Reference: https://www.youtube.com/watch?v=eNxuaTGq4Qk
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const MailgunEmailStats = new Mongo.Collection('MailgunEmailStats');

Meteor.publish('userMailgunEmailStats', function () {
    return Itineraries.find({user: this.userId});
});

MailgunEmailStats.schema = new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    emailCount: {type: Number, defaultValue: 0}
});


export default MailgunEmailStats;
