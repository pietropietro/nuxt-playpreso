//Version plugin
import Vue from 'vue'

const V = '0.3c'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');