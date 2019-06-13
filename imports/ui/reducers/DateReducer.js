initialState = {
    date: new Date()
};

export default function DateReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DATE':
            console.log(`change date action payload is ${action.payload}`);
            return { date: action.payload };
        default:
            return state;
    }
}
