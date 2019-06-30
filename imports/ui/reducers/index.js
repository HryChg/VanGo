import { combineReducers } from 'redux';

import sidebarReducer from './SidebarReducer.js';
import itineraryReducer from './ItineraryReducer.js';
import searchBarReducer from './SearchBarReducer.js';
import loginReducer from './LoginReducer.js';
import loginFormReducer from './LoginFormReducer.js';
import registerReducer from './RegisterReducer.js';
import registerFormReducer from './RegisterFormReducer.js';
import eventFilterReducer from './EventFilterReducer';
import datePickerReducer from './DatePickerReducer';
import currentEventsReducer from './CurrentEventsReducer';
import eventDrawerReducer from './EventDrawerReducer';
import mapContainerReducer from './MapContainerReducer';
import draggableItemsReducer from './DraggableItemsReducers';
import HomePageReducer from "./HomePageReducer";

export default combineReducers({
    datePicker: datePickerReducer,
    currEvents: currentEventsReducer,
    itineraryStore: itineraryReducer,
    sidebar: sidebarReducer,
    searchBar: searchBarReducer,
    login: loginReducer,
    loginForm: loginFormReducer,
    register: registerReducer,
    registerform: registerFormReducer,
    eventFilter: eventFilterReducer,
    eventDrawer: eventDrawerReducer,
    mapContainer: mapContainerReducer,
    draggableItems: draggableItemsReducer,
    homePage: HomePageReducer
});
