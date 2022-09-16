export const state = () => ({
    title: null,
    rgb: null,
})

export const mutations = {
    setActive (state, { title, rgb }) { state.title= title; state.rgb = rgb;},
}