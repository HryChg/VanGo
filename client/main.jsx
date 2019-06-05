import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../imports/ui/reducers';

Meteor.startup(() => {
  render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('react-target'));
});
=======
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../imports/ui/reducers/index.js';

Meteor.startup(() => {
  render(
      <Provider store={ createStore(reducers) }>
        <App/>
      </Provider>
      ,
      document.getElementById('react-target')
  );
});
>>>>>>> 624d85ab738495c0b3edeebd07eef892df9191b6
