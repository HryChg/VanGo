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
            categories: ['Sightseeing']
            // DESCRIPTION
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
            // DESCRIPTION
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
            // DESCRIPTION
        }
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
        if (findDuplicate(state.savedEvents, action.payload) === true){
            const eventName = action.payload.name;
            alert(`You have already added "${eventName}" to the drawer. It will not be added again`);
            return state;
        }
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
