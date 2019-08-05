import {batch} from 'react-redux';
import {updateToCurrentEvents} from './currentEventsActions';
import {updateEventDrawer} from './draggableItemsActions';

export const changeDate = (date) => {
    return async dispatch => {
        batch(()=> {
            dispatch(changeDateState(date));
            dispatch(updateToCurrentEvents(date));  
            Meteor.call('updateDrawerDate', date);
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

