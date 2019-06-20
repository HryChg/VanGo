import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../imports/ui/reducers/index.js';
import {ServiceConfiguration} from 'meteor/service-configuration';

import '../imports/ui/config.js';

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

// Meteor.startup(() => {
//     ServiceConfiguration.configurations.upsert(
//         { service: 'google' },
//         { $set: {
//                 clientId: googleOAuthClientID,
//                 loginStyle: 'popup',
//                 secret: googleOAuthSecret
//             }
//         }
//     );
// })

// AccountsTemplates.configure({
//   onLogoutHook: PostLogout
// });

AccountsTemplates.addFields([
    {
        _id: 'name',
        type: 'text',
        displayName: 'Name',
        required: true
    }
]);