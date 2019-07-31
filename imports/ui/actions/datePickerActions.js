export const changeDate = (date) => {
    console.log(date)
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
