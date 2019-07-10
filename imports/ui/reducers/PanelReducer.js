let initialState = { visible: false };

export default function PanelReducer(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_PANEL':
            return { visible: true };
        case 'HIDE_PANEL':
            return { visible: false };
        default:
            return state;
    }
}
