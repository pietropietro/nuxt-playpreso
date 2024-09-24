//Version plugin
import Vue from 'vue'

const V = '1.35c'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');