// allow us to inspect redux store on the console
// https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../imports/ui/reducers/index.js';
import thunk from 'redux-thunk';
import {Tracker} from "meteor/tracker";
import createReactiveMiddleWares from 'meteor-redux-middlewares';

import '../imports/api/itineraries.js';
import '../imports/ui/config.js';
import '../imports/config/Accounts.js';
import App from '/imports/ui/App';

const{
    sources,
    subscriptions
} = createReactiveMiddleWares(Tracker);

export const VanGoStore = createStore(reducers, compose(
    applyMiddleware(sources, subscriptions, thunk)
));

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
