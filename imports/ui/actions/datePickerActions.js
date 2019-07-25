export const changeDate = (date) => {
    return {
        type: 'CHANGE_DATE',
        payload: date
    };
};

export const toggleConfirmWindow = () => {
    return {
        type: "TOGGLE_CONFIRM_WINDOW"
    }
};


export const confirm = () => {
    return {
        type: "CONFIRM"
    }
};


export const cancel = () => {
    return {
        type: "CANCEL"
    }
};
