import { Meteor } from "meteor/meteor";
import { batch } from 'react-redux';
import { changeDate } from './datePickerActions';

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
        batch(()=> {
          dispatch(loadEventDrawer(res));
        })
    });
  }
}

export const updateEventDrawerAndDate = () => {
  return async dispatch => {
    Meteor.call('getEventDrawer', (err, res) => {
        if (err) console.log(err);
        batch(()=> {
          dispatch(loadEventDrawer(res));
          res.date ? dispatch(changeDate(res.date)) : null;
        })
    });
  }
}