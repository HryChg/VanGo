import { Meteor } from 'meteor/meteor';

export const updateDraggableItems = (newOrder) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: newOrder
  }
};

export const saveItineraryState = () => {
	return {
		type: 'SAVED_ITINERARY'
	}
};

export const saveItinerary = (itinerary) => {
	return async dispatch => {
		Meteor.call('saveItinerary', itinerary);
		dispatch(saveItineraryState());
	}
};