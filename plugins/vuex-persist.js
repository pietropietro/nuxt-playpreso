import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
      reducer: state => ({ user: state.user }),
    }).plugin(store);
  });
};