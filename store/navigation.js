export const state = () => ({
    title: null,
    rgb: null,
    openUserLabelId: null
})

export const mutations = {
    setActive (state, { title, rgb }) { state.title= title; state.rgb = rgb;},
    setOpenUserLabelId(state, id) {
        state.openUserLabelId = id;
    }
}