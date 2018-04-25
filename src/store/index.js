import Vue from 'vue'
import Vuex from 'vuex'
import DataFactory from 'rdf-ext'

Vue.use(Vuex)

let rdf = DataFactory

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    dataset: rdf.dataset([rdf.quad(rdf.namedNode('http://uned.es/analista'), rdf.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class'))]),
    initialState: 'prueba'
  },
  strict: debug

})
