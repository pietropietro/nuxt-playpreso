// store/api.js

export const state = () => ({
    // Cache for different endpoints
    cache: {}
  });
  
  export const mutations = {
    setCache(state, { route, data }) {
      // Store the data along with the current timestamp
      state.cache[route] = {
        data: data,
        timestamp: Date.now()
      };
    },
    clearCache(state) {
      state.cache = {};
    } 
  };
  