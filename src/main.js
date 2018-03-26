import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import rdfFetch from 'rdf-fetch-lite'
import Parser from 'rdf-parser-n3'
import DataFactory from 'rdf-ext'
import TagsInput from '@voerro/vue-tagsinput'
import vSelect from 'vue-select'
import Readable from 'readable-stream'
import Serializer from 'rdf-serializer-jsonld-ext'

Vue.component('tags-input', TagsInput)
Vue.component('v-select', vSelect)
Object.defineProperty(Vue.prototype, '$rdfFetch', { value: rdfFetch })
Object.defineProperty(Vue.prototype, '$N3Parser', { value: Parser })
Object.defineProperty(Vue.prototype, '$rdf', { value: DataFactory })
Object.defineProperty(Vue.prototype, '$Readable', { value: Readable })
Object.defineProperty(Vue.prototype, '$JsonLdSerializer', { value: Serializer })

Vue.use(Vuetify, {
  theme: {
    primary: '#004D40',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
