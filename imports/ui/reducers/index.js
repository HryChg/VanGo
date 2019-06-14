import { combineReducers } from 'redux';

import sidebarReducer from './SidebarReducer.js';
import itineraryReducer from './ItineraryReducer.js';
import mapReducer from './MapReducer.js';
import searchBarReducer from './SearchBarReducer.js';
import loginReducer from './LoginReducer.js';
import alertReducer from './AlertReducer.js';
import eventFilterReducer from './EventFilterReducer';
import dateReducer from './DateReducer';
import currentEventsReducer from './CurrentEventsReducer';
import eventDrawerReducer from './EventDrawerReducer';

export default combineReducers({
    currDate: dateReducer,
    currEvents: currentEventsReducer,
    itinerary: itineraryReducer,
    map: mapReducer,
    sidebar: sidebarReducer,
    searchBar: searchBarReducer,
    login: loginReducer,
    alert: alertReducer,
    eventFilter: eventFilterReducer,
    eventDrawer: eventDrawerReducer
});
