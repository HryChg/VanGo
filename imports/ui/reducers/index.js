import { combineReducers } from 'redux';

import sidebarReducer from './SidebarReducer.js';
import itineraryReducer from './ItineraryReducer.js';
import searchBarReducer from './SearchBarReducer.js';
import loginReducer from './LoginReducer.js';
import eventFilterReducer from './EventFilterReducer';
import datePickerReducer from './DatePickerReducer';
import eventDrawerReducer from './EventDrawerReducer';
import mapContainerReducer from './MapContainerReducer';
import draggableItemsReducer from './DraggableItemsReducers';
import HomePageReducer from "./HomePageReducer";

export default combineReducers({
    datePicker: datePickerReducer,
    itineraryStore: itineraryReducer,
    sidebar: sidebarReducer,
    searchBar: searchBarReducer,
    login: loginReducer,
    eventFilter: eventFilterReducer,
    eventDrawer: eventDrawerReducer,
    mapContainer: mapContainerReducer,
    draggableItems: draggableItemsReducer,
    homePage: HomePageReducer
});
