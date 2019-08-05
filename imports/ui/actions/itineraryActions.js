import {batch} from 'react-redux';
import {changeDate} from './datePickerActions';
import {updateEventDrawer} from './draggableItemsActions';

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

export const loadItineraryToDrawer = (id) => {
	return async dispatch => {
		batch(() => {
			Meteor.call('addItineraryToDrawer', id);
			dispatch(editingItinerary(true));
			Meteor.call('fetchItineraries', (err, res) => {
				if (err) console.log(err);
				batch(()=> {
					let date = getDateFromID(id, res)
					date ? dispatch(changeDate(date)) : null;
					dispatch(updateEventDrawer());		
				})
			})

		})
	}
}

// EFFECTS: returns date of itinerary given the id
//          if not found, return empty string
const getDateFromID = (id, itineraries) => {
	for (let x in itineraries) {
		if (itineraries[x]._id === id) {
			return new Date(itineraries[x].date);
		}
	}
	return "";
}