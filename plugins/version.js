//Version plugin
import Vue from 'vue'

const V = '1.29'

Vue.mixin({ data() { return { VERSION: V } } });

console.log('%cPLAYPRESO v' + V ,  'color: #00f');