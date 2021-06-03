//Version plugin
import Vue from 'vue'

const V = '0.0.1'

Vue.mixin({ data() { return { VERSION: V } } });

console.log("%PLAYPRESO v" + V, "color: #e30613");