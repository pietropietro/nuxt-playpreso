export const state = () => ({
    id: null,
    username: null,
    points: null,
    admin: null,
    created_at: null,
    ppToken: null
});

export const mutations = {
    updateUser(state, payload) {
        state.id = payload.id;
        state.username = payload.username;
        state.points = payload.points;
        state.admin = payload.admin;
        state.created_at = payload.created_at;
        state.ppToken = payload.ppToken;
    },
    clearUser(state) {
        state.id = null;
        state.username = null;
        state.points = null;
        state.admin = null;
        state.created_at = null;
        state.ppToken = null
    },
};

export const getters = {
    getCurrentUser: (state) => ({
        id: state.id,
        username: state.username,
        points: state.points,
        admin: state.admin,
        created_at: state.created_at,
        ppToken: state.ppToken
    }),
};
