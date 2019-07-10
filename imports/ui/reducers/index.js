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
import eventDrawerReducer from './EventDrawerReducer';
import mapContainerReducer from './MapContainerReducer';
import draggableItemsReducer from './DraggableItemsReducers';
import HomePageReducer from "./HomePageReducer";
import PanelReducer from './PanelReducer.js';

export default combineReducers({
    datePicker: datePickerReducer,
    itineraryStore: itineraryReducer,
    sidebar: sidebarReducer,
    searchBar: searchBarReducer,
    login: loginReducer,
    loginForm: loginFormReducer,
    register: registerReducer,
    registerForm: registerFormReducer,
    eventFilter: eventFilterReducer,
    eventDrawer: eventDrawerReducer,
    mapContainer: mapContainerReducer,
    draggableItems: draggableItemsReducer,
    homePage: HomePageReducer,
    panel: PanelReducer
});
