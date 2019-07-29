import { Meteor } from 'meteor/meteor';
import {startSubscription} from "meteor-redux-middlewares";
import EventDrawerApi from "../../api/EventDrawerApi";

export const updateDraggableItems = (newOrder, editing) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: {newOrder, editing}
  }
};

export const GET_EVENT_DRAWER_SUBSCRIPTION_READY = 'GET_EVENT_DRAWER_SUBSCRIPTION_READY';
export const GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED = 'GET_EVENT_DRAWER_SUBSCRIPTION_CHANGED';
export const LOAD_EVENT_DRAWER_SUB = 'GET_EVENT_DRAWER';
export const getEventDrawer = () => {
	return startSubscription({
		key: LOAD_EVENT_DRAWER_SUB,
		get: () => {
			return EventDrawerApi.findOne();
		},
		subscribe: () => Meteor.subscribe('userEventDrawer', Meteor.userId()) // TODO: Client-side security issue
	})
};
