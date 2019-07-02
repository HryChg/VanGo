import {Meteor} from 'meteor/meteor';
import {startSubscription} from 'meteor-redux-middlewares';

import EventDrawerApi from "../../api/EventDrawerApi";

export const addEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    };
};

export const deleteEvent = (event) => {
    return {
        type: 'DELETE_EVENT',
        payload: event
    };
};

export const LOAD_EVENT_DRAWER_SUBSCRIPTION_READY = 'LOAD_EVENT_DRAWER_SUBSCRIPTION_READY';
export const LOAD_EVENT_DRAWER_SUBSCRIPTION_CHANGED = 'LOAD_EVENT_DRAWER_SUBSCRIPTION_CHANGED';
export const LOAD_EVENT_DRAWER_SUB = 'eventDrawer';
export const loadDrawer = () => {
    return startSubscription({
        key: 'LOAD_EVENT_DRAWER',
        get: () => EventDrawerApi.find().fetch(),
        subscribe: () => Meteor.subscribe(LOAD_EVENT_DRAWER_SUB)
    })
};
