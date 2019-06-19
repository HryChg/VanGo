let initialState = {
    toggleState: false,
    savedEvents: [
        {
            id: 1,
            name: 'Canada Place',
            start_time: new Date('June 13, 2019 09:00:00'),
            end_time: new Date('May 13, 2020 05:00:00'),
            price: 20,
            latitude: 49.2888,
            longitude: -123.1111,
            link: 'https://www.canadaplace.ca/',
            categories: ['Sightseeing'],
            description: 'Canada Place is a building situated on the Burrard Inlet waterfront of Vancouver, British Columbia. It is the home of the Vancouver Convention Centre, the Pan Pacific Vancouver Hotel, Vancouver\'s World Trade Centre, and the virtual flight ride FlyOver Canada.'
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
            categories: ['Sightseeing'],
            description: 'Mostly residential, the easygoing West End offers gay bars in Davie Village, chic fashion stores on Robson Street, and diverse dining ranging from ramen shops to seafood grills. It’s also the gateway to vast Stanley Park, known for its forested trails and Seawall waterfront path. The area’s public art includes the A-maze-ing Laughter sculpture, featuring 14 cast-bronze figures, and the Inukshuk, a stone Inuit statue.'
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
            categories: ['Sightseeing'],
            description: 'The Vancouver Art Gallery is the fifth-largest art gallery in Canada, and the largest in Western Canada. It is located at 750 Hornby Street in Vancouver, British Columbia.'
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
            categories: ['Sightseeing'],
            description: 'Sunset Beach is situated in the West End near the Burrard Street Bridge and Vancouver International Hostel. The Vancouver Aquatic Centre lies at the East end of Sunset beach right next to the North end of Burrard Street Bridge. The beach has lifeguards on duty in the warm months.'
        },
    ]
};


const findDuplicate = (array, event) => {
    for (let i = 0; i < array.length; i++){
        if (array[i].id === event.id){
            return true;
        }
    }
    return false
};

export default function EventDrawerReducer(state = initialState, action) {
    if (action.type === 'ADD_EVENT') {
        const eventName = action.payload.name;

        if (findDuplicate(state.savedEvents, action.payload) === true){
            alert(`"${eventName}" is already in the drawer.\n It will not be added again.`);
            return state;
        }

        alert(`${eventName} had been added`);
        return {
            toggleState: state.toggleState,
            savedEvents: [...state.savedEvents, action.payload]
        };
    } else if (action.type === 'DELETE_EVENT') {
        let newSavedEvents = state.savedEvents.filter((event) => {
            return event !== action.payload;
        });
        return {
            toggleState: state.toggleState,
            savedEvents: newSavedEvents
        }
    }
    return state;
}
