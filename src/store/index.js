import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import consts from './consts'
import DataFactory from 'rdf-ext'
import RdfConstructs from '@/utils/RdfConstructs'

Vue.use(Vuex)

let rdf = DataFactory
let baseUrl = consts.baseUrl

// const debug = process.env.NODE_ENV !== 'production'

// TODO split vuex into modules with getters, mutations, actions

export default new Vuex.Store({
  // TODO refactor vuex store in getters, mutations, actions, etc
  state: {
    rdfConstructs: RdfConstructs,
    baseUrl: consts.baseUrl,
    dataset: rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(baseUrl + 'Analista')), rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')), rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista'))])
  },
  getters,
  mutations,
  actions,
  strict: false

})
