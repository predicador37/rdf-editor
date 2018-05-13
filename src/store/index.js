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
    dataset: rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class')), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class')), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode(baseUrl + 'Analista'))]),
    queryResult: null,
    currentClassName: null,
    initialState: 'prueba',
    // TODO: extract rdf constants to external js file
    rdfProperties: {

      rdf_type: {
        text: 'rdf:type',
        value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      },
      rdfs_subClassOf: {
        text:
          'rdfs:subClassOf',
        value:
          'http://www.w3.org/2000/01/rdf-schema#subClassOf'
      },
      rdfs_subPropertyOf: {
        text: 'rdfs:subPropertyOf',
        value:
          'http://www.w3.org/2000/01/rdf-schema#subPropertyOf'
      },
      rdfs_domain: {
        text: 'rdfs:domain',
        value: 'http://www.w3.org/2000/01/rdf-schema#domain'
      },
      rdfs_range: {
        text: 'rdfs:range',
        value: 'http://www.w3.org/2000/01/rdf-schema#range'
      }
    },
    owlClasses: {
      owl_Thing: {
        text: 'owl:Thing',
        value: 'https://www.w3.org/2002/07/owl#Thing'
      },
      owl_Class: {
        text: 'owl:Class',
        value: 'https://www.w3.org/2002/07/owl#Class'
      },
      owl_DatatypeProperty: {
        text: 'owl:DatatypeProperty',
        value: 'https://www.w3.org/2002/07/owl#DatatypeProperty'
      },
      owl_ObjectProperty: {
        text: 'owl:ObjectProperty',
        value: 'https://www.w3.org/2002/07/owl#ObjectProperty'
      },
      rdf_XMLLiteral: {
        text: 'rdf:XMLLiteral',
        value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral'
      }
    },
    owlProperties: {
      owl_EquivalentClass: {
        text: 'owl:EquivalentClass',
        value: 'http://www.w3.org/2002/07/owl#EquivalentClass'
      }
    }
  },
  getters: {
    dataset: state => state.dataset,
    owlProperties: state => state.owlProperties,
    rdfProperties: state => state.rdfProperties,
    owlClasses: state => state.owlClasses,
    queryResult: state => state.queryResult
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
    // TODO parametrize this: getSubjectListByPredicateAndObject
    getSubjectListByPredicateAndObject (state, {predicate, object}) {
      console.log('starting getSubjectListByPredicateAndObject')
      let classes = []

      let quadStream = state.dataset.toStream()

      quadStream.on('data', (quad) => {
        if ((quad.object.equals(rdf.namedNode(object))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
          classes.push({text: quad.subject.value.split(baseUrl)[1], value: quad.subject.value})
          console.log(classes)
        }
      })
      state.queryResult = classes
      console.log('finishing getSubjectListByObjectAndPredicate')
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
    getSubjectListByPredicateAndObject (context, {predicate, object}) {
      context.commit('getSubjectListByPredicateAndObject', {predicate: predicate, object: object})
    },
    addClass (context, className) {
      context.commit('addQuadFromIri', {subject: baseUrl + className, predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', object: 'https://www.w3.org/2002/07/owl#Class'})
    }
  },
  strict: false

})
