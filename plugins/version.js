//Version plugin
import Vue from 'vue'

const V = '1.34d'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');