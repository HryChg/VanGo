import { Mongo } from 'meteor/mongo';

export const CalledDates = new Mongo.Collection('calledDates');

  CalledDates.allow({
    insert: function(userId, doc) {
      return true;
    }
  });