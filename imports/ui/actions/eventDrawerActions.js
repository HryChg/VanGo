import EventDrawerApi from "../../api/EventDrawerApi";

export const addEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    };
};

export const deleteEvent = (event) => {
    return {
        type: 'DELETE_EVENT',
        payload: event
    };
};


export const loadDrawer = (events) => {
    return async (dispatch, getState) => {
        try {
            console.log('loadDrawer action creator called');

            const response = await EventDrawerApi.find();
            console.log(response);
            dispatch({
                type: 'LOAD_DRAWER',
                payload: response
            });
        } catch (error) {
            console.log('Error: Unable to extract drawer items from EventDrawer');
            console.log(error);
        }




    };
};
