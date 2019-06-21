let initialState = {items: []};

export default function DraggableItemsReducer(state = initialState, action) {
    if (action.type === 'UPDATE_EDITED_ITEM'){
        return {items: action.payload};
    }


    return state;
}
