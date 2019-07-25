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

export const saveItinerary = (itinerary, editing) => {
	return async dispatch => {
		Meteor.call('saveItinerary', itinerary, editing, (err) => {
			if (err) {
				alert(err.reason);
			} else {
				// alert('Itinerary has been saved!');
				dispatch(saveItineraryState());
			}
		});
	}
};
