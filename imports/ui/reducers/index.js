import { combineReducers } from 'redux';

import sidebarReducer from "./sidebarReducer.js";
import itineraryReducer from "./itineraryReducer.js";

export default combineReducers({
    sidebar: sidebarReducer,
    itinerary: itineraryReducer
});
