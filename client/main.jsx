import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../imports/ui/reducers/index.js';
import '../imports/startup/accounts-config.js';

import App from '/imports/ui/App'
import PostLogout from '/imports/ui/components/user/PostLogout'


// allow us to inspect redux store on the console
// https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console
export let VanGoStore = createStore(reducers);
window.store = VanGoStore;
window.getStoreState = () => {
    console.log(window.store.getState());
};


Meteor.startup(() => {
  render(
      <Provider store={ VanGoStore }>
        <App/>
      </Provider>
      ,
      document.getElementById('react-target')
  );
});

// AccountsTemplates.configure({
//   onLogoutHook: PostLogout
// });

AccountsTemplates.addFields([
    {
        _id: 'firstName',
        type: 'text',
        displayName: 'First Name',
        required: true
    },
    {
        _id: 'lastName',
        type: 'text',
        displayName: 'Last Name',
        required: true
    }
]);