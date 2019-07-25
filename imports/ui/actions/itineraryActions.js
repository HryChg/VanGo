export const selectID = (id) => {
	return {
		type: 'SELECT_ID',
		payload: id
	}
}

export const editingItinerary = (state) => {
	return {
		type: 'EDITING_ITINERARY',
		payload: state
	}
}

export const loadItineraries = (itineraries) => {
	return {
		type: 'LOAD_ITINERARIES',
		payload: itineraries
	}
}