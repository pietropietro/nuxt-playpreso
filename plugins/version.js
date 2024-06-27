//Version plugin
import Vue from 'vue'

const V = '1.34b'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');