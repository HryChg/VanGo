import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'saveUser': function(data) {
      if (data.password.length < 8) throw new Meteor.Error("Password too short");
      return Accounts.createUser(data);
    }
  });