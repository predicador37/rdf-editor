import Vue from 'vue'
import Vuex from 'vuex'
import DataFactory from 'rdf-ext'
import Serializer from 'rdf-serializer-jsonld-ext'
import RdfConstructs from '@/utils/RdfConstructs'
import Parser from 'rdf-parser-n3'
import StringStream from 'string-to-stream'

Vue.use(Vuex)

let rdf = DataFactory
let N3Parser = Parser
let string2stream = StringStream
let JsonLdSerializer = Serializer
const baseUrl = 'http://uned.es/example#'

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // TODO refactor vuex store in getters, mutations, actions, etc
  state: {
    rdfConstructs: RdfConstructs,
    currentClassName: null,
    initialState: 'prueba',
    dataset: rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(baseUrl + 'Analista')), rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')), rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista'))])
  },
  getters: {
    dataset: state => state.dataset,
    rdfConstructs: state => state.rdfConstructs
  },
  mutations: {
    initializeDataset (state, dataset) {
      state.dataset = dataset
    },

    addQuadFromIri (state, {subject, predicate, object}) {
      console.log(subject)
      console.log(predicate)
      console.log(object)
      state.dataset.add(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
    },
    addQuadWithObjectLiteralFromIri (state, {subject, predicate, object}) {
      console.log(subject)
      console.log(predicate)
      console.log(object)
      state.dataset.add(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
    },
    importN3 (state, content) {
      const turtleParser = new N3Parser({factory: rdf})
      let quadStream = turtleParser.import(string2stream(content))
      quadStream.on('data', (quad) => {
        console.log(quad.toString())
      })
      rdf.dataset().import(quadStream).then((dataset) => {
        state.dataset = dataset
        console.log(JSON.stringify(state.dataset))
      })
    },
    exportJsonLD (state) {
      // create a prefix map and fill it
      const prefixMap = rdf.prefixMap({
        ex: rdf.namedNode('http://www.uned.es/semantic/')
      })
      let quadStream = state.dataset.toStream()

      // create a JSON-LD serializer instance which returns strings and compacts the JSON-LD
      const serializer = new JsonLdSerializer({outputFormat: 'string', compact: true})
      // forward the quads to the serializer
      const jsonStream = serializer.import(quadStream)

      prefixMap.export(quadStream)

      let result

      jsonStream.on('data', (data) => {
        result = data
      })

      return rdf.waitFor(jsonStream).then(() => {
        let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
        let downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', dataStr)
        downloadAnchorNode.setAttribute('download', 'dataset.json')
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
        console.log(dataStr)
      })
    }
  },
  actions: {
    // TODO fix warning about vuex state
    addClass (context, className) {
      if (className != null) {
        context.commit('addQuadFromIri', {
          subject: baseUrl + className,
          predicate: RdfConstructs.rdf_type.value,
          object: RdfConstructs.owl_Class.value
        })
      }
    },
    addResource (context, {subject, predicate, object}) {
      if (subject != null && predicate != null && object != null) {
        context.commit('addQuadFromIri', {
          subject: baseUrl + subject,
          predicate: predicate,
          object: object
        })
      }
    },
    addClassLiteralProperty (context, {resourceName, property, literal}) {
      if (resourceName != null) {
        context.commit('addQuadWithObjectLiteralFromIri', {
          subject: baseUrl + resourceName,
          predicate: RdfConstructs[property].value,
          object: literal
        })
      }
    },
    importN3 (context, content) {
      context.commit('importN3', content)
    },
    exportJsonLD (context) {
      context.commit('exportJsonLD')
    }
  },
  strict: false

})
