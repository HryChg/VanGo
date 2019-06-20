import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout, login } from '../ui/actions/userActions.js';
import { connect } from 'react-redux';

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

AccountsTemplates.configure({
  onLogoutHook: postLogout,
  onSubmitHook: postLogin
});

AccountsTemplates.addFields([
    {
        _id: 'name',
        type: 'text',
        displayName: 'Name',
        required: true
    }
]);