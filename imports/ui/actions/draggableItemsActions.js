import { Meteor } from 'meteor/meteor';
import {startSubscription} from "meteor-redux-middlewares";
import EventDrawerApi from "../../api/EventDrawerApi";

export const updateDraggableItems = (newOrder) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: newOrder
  }
};

export const GET_EVENT_DRAWER_SUBSCRIPTION_READY = 'GET_EVENT_DRAWER_SUBSCRIPTION_READY';
export const GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED = 'GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED';
export const LOAD_EVENT_DRAWER_SUB = 'GET_EVENT_DRAWER';
export const getDrawerItems = () => {
	return startSubscription({
		key: LOAD_EVENT_DRAWER_SUB,
		get: () => {
			if (Meteor.userId()){
				return EventDrawerApi.findOne({user: Meteor.userId()}).items;
			} else {
				return EventDrawerApi.findOne({user: 'anon'}).items;
			}
		},
		subscribe: () => Meteor.subscribe('eventDrawer')
	})
};
