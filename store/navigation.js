export const state = () => ({
    title: null,
    color: null,
})

export const mutations = {
    setActive (state, { title, color }) { state.title= title; state.color = color;},
}