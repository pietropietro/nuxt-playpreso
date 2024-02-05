export const state = () => ({
    title: null,
    emoji: null,
    overline: null,
    openUserLabelId: null
})

export const mutations = {
    setTitle(state, newTitle) {
        state.title = newTitle;
    },
    setEmoji(state, newEmoji) {
        state.emoji = newEmoji;
    },
    setOverline(state, newOverline) {
        state.overline = newOverline;
    },
    setOpenUserLabelId(state, id) {
        state.openUserLabelId = id;
    }
}

export const actions = {
    updateTitle({ commit }, payload) {
        commit('setTitle', payload?.newTitle ?? null);
        commit('setEmoji', payload?.newEmoji ?? null);
        commit('setOverline', payload?.newOverline ?? null);
    },
};