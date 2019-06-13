import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../imports/ui/reducers/index.js';


// allow us to inspect redux store on the console
// https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console
let VanGoStore = createStore(reducers);
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
