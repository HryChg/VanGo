import { combineReducers } from 'redux';

import sidebarReducer from './SidebarReducer.js';
import itineraryReducer from './ItineraryReducer.js';
import searchBarReducer from './SearchBarReducer.js';
import loginReducer from './LoginReducer.js';
import alertReducer from './AlertReducer.js';
import eventFilterReducer from './EventFilterReducer';
import dateReducer from './DateReducer';
import currentEventsReducer from './CurrentEventsReducer';
import eventDrawerReducer from './EventDrawerReducer';
import mapContainerReducer from './MapContainerReducer';
import draggableItemsReducer from './DraggableItemsReducers';

export default combineReducers({
    currDate: dateReducer,
    currEvents: currentEventsReducer,
    itinerary: itineraryReducer,
    sidebar: sidebarReducer,
    searchBar: searchBarReducer,
    login: loginReducer,
    alert: alertReducer,
    eventFilter: eventFilterReducer,
    eventDrawer: eventDrawerReducer,
    mapContainer: mapContainerReducer,
    draggableItems: draggableItemsReducer
});
