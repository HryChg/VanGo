export const selectID = (id) => {
	return {
		type: 'SELECT_ID',
		payload: id
	}
}

export function showItineraryPanel() {
	return {
		type: 'SHOW_ITINERARY_PANEL'
	}
}

export function hideItineraryPanel() {
	return {
		type: 'HIDE_ITINERARY_PANEL'
	}
}