let initialState = {
    events: [
        {
            id: 1,
            name: 'E1',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 47.2052192687988, 
            longitude: -121.988426208496
            // link
        },
        {
            id: 2,
            name: 'E2',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 47.6307081,
            longitude: -122.1434325
            // link
        },
        {
            id: 3,
            name: 'E3',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 47.3084488,
            longitude: -122.2140121
            // link
        },
        {
            id: 4,
            name: 'E1',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 13, 2019 05:00:00'),
            price: 0,
            latitude: 47.5524695, 
            longitude: -122.0425407
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
