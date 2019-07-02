import { Meteor } from 'meteor/meteor';

export const selectDate = (date) => {
	return {
		type: 'SELECT_DATE',
		payload: date
	}
}

export const saveItinerary = (itinerary) => {
	return () => {
		console.log(itinerary);
		Meteor.call('saveItinerary', itinerary);
	}
}