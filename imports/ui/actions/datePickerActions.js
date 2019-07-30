const loadCurrentEvents = (events) => {
    return {
        type: 'LOAD_CURRENT_EVENTS',
        payload: events
    }
}

const updateDateState = (date) => {
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

export function changeDate(date) {
    return async dispatch => {
        Meteor.call('updateEvents', date, (err, res) => {
            if (err) console.log(err);
            dispatch(loadCurrentEvents(res));
            dispatch(updateDateState(date));
        });
    }
};