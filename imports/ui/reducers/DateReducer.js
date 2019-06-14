let initialState = {
    currDate: new Date()
};

export default function DateReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DATE':
            console.log(`change date action payload is ${action.payload}`);
            return { currDate: action.payload };
        default:
            return state;
    }
}
