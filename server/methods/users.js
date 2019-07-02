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
        return Accounts.onCreateUser(data);
    }
  });

  // Returns error message
  function checkPassword(password) {
    if (password.length < 6) {
      const passwordError = "Password too short. Must be at least 6 characters.\n"
      return passwordError;
    }
  }

  // Returns error message
  function checkEmail(email) {
    const regex = /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    console.log(regex);
    if (regex) {
      const emailError = "Invalid email address.\n"
      return emailError;
    }
  }
