let initialState = {
    events: [
        {
            id: 1,
            name: 'Canada Place',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 49.2888,
            longitude: -123.1111
            // link
        },
        {
            id: 2,
            name: 'Downtown Vancouver',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 49.2820,
            longitude: -123.1171
            // link
        },
        {
            id: 3,
            name: 'Sunset Beach',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 49.2799,
            longitude: -123.1387
            // link
        },
        {
            id: 4,
            name: 'Vancouver Art Gallery',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 49.28287695,
            longitude: -123.1205638545168
            // link
        }
    ]
};

export default function CurrentEventsReducer(state = initialState, action) {
    switch (action.type) {
        // case 'CHANGE_DATE':
        //     console.log(`change date action payload is ${action.payload}`);
        //     return { date: action.payload };
        default:
            return state;
    }
}
