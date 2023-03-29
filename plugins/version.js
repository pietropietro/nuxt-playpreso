//Version plugin
import Vue from 'vue'

const V = '1.28i'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');