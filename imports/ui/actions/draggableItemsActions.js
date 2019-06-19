export const updateDraggableItems = (newOrder) => {
  return {
      type: 'UPDATE_EDITED_ITEM',
      payload: newOrder
  }
};
