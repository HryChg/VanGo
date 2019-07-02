import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
<<<<<<< HEAD
import thunk from 'redux-thunk';
=======
>>>>>>> 8052522e886888b17835853c4510fe3c7a855eed
import reducers from '../imports/ui/reducers/index.js';
import thunk from 'redux-thunk';

import '../imports/api/itineraries.js';
import '../imports/ui/config.js';
import '../imports/config/Accounts.js';
import App from '/imports/ui/App';


// allow us to inspect redux store on the console
// https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console

export const VanGoStore = createStore(reducers, applyMiddleware(thunk));
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
