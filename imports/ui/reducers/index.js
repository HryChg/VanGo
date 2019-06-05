import { combineReducers } from 'redux';

import sidebarReducer from './SidebarReducer.js';
import itineraryReducer from './ItineraryReducer.js';
import mapReducer from './MapReducer.js';
import searchbarReducer from './SearchBarReducer.js';
import loginReducer from './LoginReducer.js';
import alertReducer from './AlertReducer.js';

export default combineReducers({
    sidebar: sidebarReducer,
    itinerary: itineraryReducer,
    map: mapReducer,
    sidebar: sidebarReducer,
    searchbar: searchbarReducer,
    login: loginReducer,
    alert: alertReducer
});
