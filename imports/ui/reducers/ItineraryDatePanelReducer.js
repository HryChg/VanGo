let initialState = { visible: false };

export default function ItineraryDatePanelReducer(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ITINERARY_PANEL':
            return { visible: true };
        case 'HIDE_ITINERARY_PANEL':
            return { visible: false };
        default:
            return state;
    }
}
