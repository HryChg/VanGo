import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'createUserWithCheck': function(data) {
      let errorMessage = "";
      errorMessage += checkPassword(data.password);
      errorMessage += checkEmail(data.email);
      if (errorMessage !== "") {
        throw new Meteor.Error(errorMessage, errorMessage);
      }
        return Accounts.createUser(data);
        // , (err) => {
        //   throw new Meteor.Error(err, err);
        // });
    }
  });

  // Returns error message
  function checkPassword(password) {
    let error = "";
    if (password.length < 6) {
      error = "Password too short. Must be at least 6 characters.\n"
    } else {
      error = "";
    }
    return error;
  }

  // Returns error message
  function checkEmail(email) {
    const regex = /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    let error = "";
    if (regex) {
      error = "";
    } else {
      error = "Invalid email address.\n";
    }
    return error;
  }
