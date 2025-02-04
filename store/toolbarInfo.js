export const state = () => ({
    infoDict: {},
  });
  
  export const mutations = {
    setInfoKey(state, { key, value }) {
      state.infoDict = {
        ...state.infoDict,
        [key]: value,
      };
    },
    setAllinfoKeys(state, value) {
      Object.keys(state.infoDict).forEach((key) => {
        state.infoDict[key] = value;
      });
    },
  };
  
  export const getters = {
    getDict: (state) => {
      return state.infoDict;
    },
  };
  