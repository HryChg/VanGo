import {batch} from 'react-redux';
import {filterPrice} from "./eventFilterActions.js";
import {getMaxPrice} from './../../util/util.js'

export const loadCurrentEvents = (events) => {
    return {
        type: 'LOAD_CURRENT_EVENTS',
        payload: events
    }
}

// EFFECTS: updates current events by calling to db and loading events and price to redux
export const updateToCurrentEvents = (date) => {
    return async dispatch => {
        return Meteor.call('updateEvents', date, (err, res) => {
            if (err) console.log(err);
            batch(() => {
                dispatch(loadCurrentEvents(res));
                let maxPrice = getMaxPrice(res);
                dispatch(filterPrice([0, maxPrice? maxPrice: 0]));    
            })
        })
    }
}