let initialState = {editedPath: []};

export default function DraggableItemsReducer(state = initialState, action) {
    return {editedPath: action.payload};
}
