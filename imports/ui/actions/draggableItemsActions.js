export const updateDraggableItems = (newOrder, editing) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: {newOrder, editing}
  }
};

export const loadEventDrawer = (eventDrawer) => {
	return {
		type: 'LOAD_EVENT_DRAWER',
		payload: eventDrawer
	}
}

export const clearDrawerItems = () => {
  return {
    type: 'CLEAR_DRAWER_ITEMS'
  }
}