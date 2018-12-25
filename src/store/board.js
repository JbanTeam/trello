const state = {
  draggingCard: null,
  droppingList: null
};

const mutations = {
  setDroppingList: (state, droppingList) => {
    state.droppingList = droppingList;
  },
  setDraggingCard: (state, draggingCard) => {
    state.draggingCard = draggingCard;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
