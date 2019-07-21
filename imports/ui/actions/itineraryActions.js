export const selectID = (id) => {
	return {
		type: 'SELECT_ID',
		payload: id
	}
}

export const editingItinerary = (state) => {
	console.log(state)
	return {
		type: 'EDITING_ITINERARY',
		payload: state
	}
}