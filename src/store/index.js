import { createStore } from 'vuex';

export default createStore({
  state: {
    images: [],
  },
  mutations: {
    ADD_IMAGE(state, image) {
      state.images.push(image);
    },
  },
  actions: {
    addImage({ commit }, image) {
      commit('ADD_IMAGE', image);
    },
  },
  getters: {
    allImages: (state) => state.images,
  },
});
