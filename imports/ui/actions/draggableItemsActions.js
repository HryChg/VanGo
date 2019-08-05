import { Meteor } from "meteor/meteor";

export const updateDraggableItems = (newOrder, editing) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: {newOrder, editing}
  }
};

export const loadEventDrawer = (eventDrawer) => {
	return {
		type: 'LOAD_EVENT_DRAWER',
		payload: eventDrawer
	}
}

export const clearDrawerState = (date) => {
  return {
    type: 'CLEAR_DRAWER',
    payload: date
  }
}

export const saveToEventDrawer = (event) => {
  return {
    type: 'SAVE_TO_DRAWER',
    payload: event
  }
}

export const updateEventDrawer = () => {
  return async dispatch => {
    Meteor.call('getEventDrawer', (err, res) => {
        if (err) console.log(err);
        dispatch(loadEventDrawer(res));
    });
  }
}