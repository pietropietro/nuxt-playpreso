//Version plugin
import Vue from 'vue'

const V = '1.25a'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');