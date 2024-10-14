// store/api.js

export const state = () => ({
    // Cache for different endpoints
    cache: {},
    versionUpdateNeeded: false, 
    maintenanceMode: false, 
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
    },
    removeResponseCache(state, route) {
      state.cache[route] = null;
    },
    setVersionUpdate(state, status) {
      // Set version update status (true or false)
      state.versionUpdateNeeded = status;
    },
    setMaintenanceMode(state, status) {
      // Set version update status (true or false)
      state.maintenanceMode= status;
    },
  };
  