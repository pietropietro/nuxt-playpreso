export const state = () => ({
    loadingDict: {},
  });
  
  export const mutations = {
    set(state, { key, isLoading }) {
      console.log('calling set loading for', key, isLoading);
      state.loadingDict = {
        ...state.loadingDict,
        [key]: isLoading,
      };
    },
  };
  
  export const getters = {
    // Check if any loading is still in progress
    isLoading: (state) => {
      return Object.values(state.loadingDict).some((loading) => loading);
    },
  };
  