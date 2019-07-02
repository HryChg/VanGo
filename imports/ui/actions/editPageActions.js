export const saveItineraryState = () => {
	return {
		type: 'SAVED_ITINERARY'
	}
};

export const resetEditPage = () => {
	return {
		type: 'RESET_EDIT'
	}
};

export const saveItinerary = (itinerary) => {
	return async dispatch => {
		Meteor.call('saveItinerary', itinerary);
		dispatch(saveItineraryState());
	}
};
