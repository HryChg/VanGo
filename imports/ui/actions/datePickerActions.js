import {batch} from 'react-redux';
import {loadCurrentEvents} from './currentEventsActions';
import {filterPrice} from "./eventFilterActions.js";
import {getMaxPrice} from './../../util/util.js'

export const changeDate = (date) => {
    return async dispatch => {
        batch(()=> {
            dispatch(changeDateState(date));
            Meteor.call('updateDrawerDate', date);
            Meteor.call('updateEvents', date, (err, res) => {
                if (err) console.log(err);
                batch(() => {
                    dispatch(loadCurrentEvents(res));
                    let maxPrice = getMaxPrice(res);
                    dispatch(filterPrice([0, maxPrice? maxPrice: 0]));    
                })
            })
        })
    }
}



export const changeDateState = (date) => {
    return {
        type: 'CHANGE_DATE',
        payload: date
    };
}

export const toggleConfirmWindow = () => {
    return {
        type: "TOGGLE_CONFIRM_WINDOW"
    }
};

// EFFECTS: confirm and close the confirm window
export const confirm = () => {
    return {
        type: "CONFIRM"
    }
};

// EFFECTS: cancel and close the confirm window
export const cancel = () => {
    return {
        type: "CANCEL"
    }
};

