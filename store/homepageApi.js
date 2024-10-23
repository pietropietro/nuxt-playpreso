export const state = () => ({
  loadingDict: {},
});

export const mutations = {
  setLoadingKey(state, { key, isLoading }) {
    state.loadingDict = {
      ...state.loadingDict,
      [key]: isLoading,
    };
  },
  setAllLoadingKeys(state, isLoading) {
    Object.keys(state.loadingDict).forEach((key) => {
      state.loadingDict[key] = isLoading;
    });
  },
};

export const getters = {
  isLoading: (state) => {
    return Object.values(state.loadingDict).some((loading) => loading);
  },
};
