import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout, login } from '../ui/actions/userActions.js';
import { connect } from 'react-redux';
import { Accounts } from 'meteor/accounts-base';

let postLogout = () => {
  // logout();
  return (<Redirect to='/' />);
};

let postLogin = (error, state) => {
  if (!error) {
    if(state === "signIn") {
      // login();
      return (<Redirect to='/' />);
    }
  }
}


// AccountsTemplates.configureRoute('signIn', {
//   layoutType: 'blaze-to-react',
//   name: 'signin',
//   path: '/login',
// });

// AccountsTemplates.configure({
//   onLogoutHook: postLogout,
//   onSubmitHook: postLogin
// });

// Accounts.config({
//   forbigClientAccountCreation: false
// });