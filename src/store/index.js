import Vue from 'vue'
import Vuex from 'vuex'
import DataFactory from 'rdf-ext'
import Serializer from 'rdf-serializer-jsonld-ext'

Vue.use(Vuex)

let rdf = DataFactory
let JsonLdSerializer = Serializer
const baseUrl = 'http://uned.es/'

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    // TODO redefine dataset as a computed property
    dataset: rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class')), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class')), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode(baseUrl + 'Analista')), rdf.quad(rdf.namedNode(baseUrl + 'Capturador de Requisitos'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class'))]),
    currentClassName: null,
    initialState: 'prueba',
    // TODO: extract rdf constants to external js file
    rdfConstructs: {
      rdf_type: {
        text: 'rdf:type',
        value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
        type: 'property'
      },
      rdfs_subClassOf: {
        text:
          'rdfs:subClassOf',
        value:
          'http://www.w3.org/2000/01/rdf-schema#subClassOf',
        type: 'property'
      },
      rdfs_subPropertyOf: {
        text: 'rdfs:subPropertyOf',
        value:
          'http://www.w3.org/2000/01/rdf-schema#subPropertyOf',
        type: 'property'
      },
      rdfs_domain: {
        text: 'rdfs:domain',
        value: 'http://www.w3.org/2000/01/rdf-schema#domain',
        type: 'property'
      },
      rdfs_range: {
        text: 'rdfs:range',
        value: 'http://www.w3.org/2000/01/rdf-schema#range',
        type: 'property'
      },
      owl_Thing: {
        text: 'owl:Thing',
        value: 'https://www.w3.org/2002/07/owl#Thing',
        type: 'class'
      },
      owl_Class: {
        text: 'owl:Class',
        value: 'https://www.w3.org/2002/07/owl#Class',
        type: 'class'
      },
      owl_DatatypeProperty: {
        text: 'owl:DatatypeProperty',
        value: 'https://www.w3.org/2002/07/owl#DatatypeProperty',
        type: 'class'
      },
      owl_ObjectProperty: {
        text: 'owl:ObjectProperty',
        value: 'https://www.w3.org/2002/07/owl#ObjectProperty',
        type: 'class'
      },
      rdf_XMLLiteral: {
        text: 'rdf:XMLLiteral',
        value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral',
        type: 'class'
      },
      owl_EquivalentClass: {
        text: 'owl:EquivalentClass',
        value: 'http://www.w3.org/2002/07/owl#EquivalentClass',
        type: 'property'
      }
    }
  },
  getters: {
    dataset: state => state.dataset,
    rdfConstructs: state => state.rdfConstructs,
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
          predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
          object: 'https://www.w3.org/2002/07/owl#Class'
        })
      }
    }
  },
  strict: false

})
