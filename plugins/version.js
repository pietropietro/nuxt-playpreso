//Version plugin
import Vue from 'vue'

const V = '1.31g'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');