import Vue from 'vue'
import Vuex from 'vuex'
import DataFactory from 'rdf-ext'
import Serializer from 'rdf-serializer-jsonld-ext'

Vue.use(Vuex)

let rdf = DataFactory
let JsonLdSerializer = Serializer

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    dataset: rdf.dataset([rdf.quad(rdf.namedNode('http://uned.es/analista'), rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      rdf.namedNode('https://www.w3.org/2002/07/owl#Class'))]),
    queryResult: null,
    initialState: 'prueba',
    rdfProperties: [
      {text: 'rdf:type', value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'},
      {text: 'rdfs:subClassOf', value: 'http://www.w3.org/2000/01/rdf-schema#subClassOf'},
      {text: 'rdfs:subPropertyOf', value: 'http://www.w3.org/2000/01/rdf-schema#subPropertyOf'},
      {text: 'rdfs:domain', value: 'http://www.w3.org/2000/01/rdf-schema#domain'},
      {text: 'rdfs:range', value: 'http://www.w3.org/2000/01/rdf-schema#range'}

    ],
    owlClasses: [
      {text: 'owl:Thing', value: 'https://www.w3.org/2002/07/owl#Thing'},
      {text: 'owl:Class', value: 'https://www.w3.org/2002/07/owl#Class'},
      {text: 'owl:DatatypeProperty', value: 'https://www.w3.org/2002/07/owl#DatatypeProperty'},
      {text: 'owl:ObjectProperty', value: 'https://www.w3.org/2002/07/owl#ObjectProperty'},
      {text: 'rdf:XMLLiteral', value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral'}
    ]
  },
  getters: {

  },
  mutations: {
    initializeDataset (state, dataset) {
      state.dataset = dataset
    },
    addQuadFromIri (state, subject, predicate, object) {
      state.dataset.add(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
    },
    getClassList (state) {
      console.log('starting getClassList')
      let classes = []

      let quadStream = state.dataset.toStream()

      quadStream.on('data', (quad) => {
        if ((quad.object.equals(rdf.namedNode('https://www.w3.org/2002/07/owl#Class'))) && (quad.predicate.equals(rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')))) {
          classes.push({text: quad.subject.value, value: quad.subject.value})
          console.log(classes)
        }
      })
      state.queryResult = classes
      console.log('finishing getClassList')
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
    getClassList (context) {
      context.commit('getClassList')
    }
  },
  strict: false

})
