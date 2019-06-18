let initialState = {
    events: [
        {
            id: 1,
            name: 'Canada Place',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('May 13, 2020 05:00:00'),
            price: 20,
            latitude: 49.2888,
            longitude: -123.1111,
            link: 'https://www.canadaplace.ca/',
            categories: ['Sightseeing']
        },
        {
            id: 2,
            name: 'Downtown Vancouver',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('June 15, 2019 05:00:00'),
            price: 50,
            latitude: 49.2820,
            longitude: -123.1171,
            link: 'https://vancouver.ca/news-calendar/downtown.aspx',
            categories: ['Sightseeing']
        },
        {
            id: 3,
            name: 'Sunset Beach',
            start_time: new Date('February 10, 2019 09:00:00'),
            end_time: new Date('February 13, 2019 05:00:00'),
            price: 33,
            latitude: 49.2799,
            longitude: -123.1387,
            link: 'https://vancouver.ca/parks-recreation-culture/sunset-beach.aspx',
            categories: ['Sightseeing']
        },
        {
            id: 4,
            name: 'Vancouver Art Gallery',
            start_time: new Date('May 13, 2019 09:00:00'),
            end_time: new Date('June 27, 2019 05:00:00'),
            price: 99,
            latitude: 49.28287695,
            longitude: -123.1205638545168,
            link: 'http://vanartgallery.bc.ca/index.html',
            categories: ['Sightseeing']
        },
        {
            id: 5,
            name: 'West End',
            start_time: new Date('June 10, 2019 09:00:00'),
            end_time: new Date('June 17, 2019 05:00:00'),
            price: 0,
            latitude: 49.2856,
            longitude: -123.1306,
            link: 'https://www.tourismvancouver.com/vancouver/neighbourhoods/west-end/',
            categories: ['Sightseeing']
        },
        {
            id: 6,
            name: 'Strawberry Festival',
            start_time: new Date('June 22, 2019 13:00:00'),
            end_time: new Date('June 22, 2019 16:00:00'),
            price: 0,
            latitude: 49.289680,
            longitude: -123.136950,
            link: 'https://www.todocanada.ca/city/vancouver/event/strawberry-festival-2/',
            categories: ['Food']
        },
        {
            id: 7,
            name: 'Butterflies – Experience the Transformation - Vancouver Aquarium',
            start_time: new Date('May 13, 2019 09:00:00'),
            end_time: new Date('September 2, 2019 17:00:00'),
            price: 38,
            latitude: 49.300430,
            longitude: -123.127910,
            link: 'https://www.todocanada.ca/city/vancouver/event/strawberry-festival-2/',
            categories: ['Sightseeing']
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
