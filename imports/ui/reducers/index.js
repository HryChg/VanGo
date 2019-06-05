import { combineReducers } from 'redux';

import sidebarReducer from "./sidebarReducer.js";

export default combineReducers({
    sidebar: sidebarReducer
});
