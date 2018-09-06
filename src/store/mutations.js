import DataFactory from 'rdf-ext'
import {Parser, Store, Writer} from 'n3'
import Serializer from 'rdf-serializer-jsonld-ext'

let N3Parser = Parser
let N3Writer = Writer
let rdf = DataFactory
let JsonLdSerializer = Serializer

const ADD_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

/**
 * Elimina una tripleta a partir de un IRI generado desde los parámetros de entrada
 * @param state
 * @param subject
 * @param predicate
 * @param object
 * @constructor
 */
const REMOVE_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

const EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI = (state, {subject, predicate, object, newObject}) => {
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
  console.log(subject)
  console.log(predicate)
  console.log(object)
  console.log(newObject)
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(newObject)))
}

const REMOVE_RESOURCE_FROM_IRI = (state, resource) => {
  let results = state.n3store.getQuads(rdf.namedNode(resource), null, null, null)
  for (var quad of results) {
    state.n3store.removeQuad(quad)
  }
  results = state.n3store.getQuads(null, rdf.namedNode(resource), null, null)
  for (quad of results) {
    state.n3store.removeQuad(quad)
  }
  results = state.n3store.getQuads(null, null, rdf.namedNode(resource), null)
  for (quad of results) {
    state.n3store.removeQuad(quad)
  }
}

const ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
}

const IMPORT_N3 = (state, {content, store}) => {
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store] = new Store(quads)
  console.log(JSON.stringify(state[store].getQuads()))
}

const ADD_N3 = (state, {content, store}) => {
  console.log('add n3')
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store].addQuads(quads)
  // console.log(JSON.stringify(state[store].getQuads()))
}

const DEL_N3 = (state, {content, store}) => {
  console.log('del n3')
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store].removeQuads(quads)
  // console.log(JSON.stringify(state[store].getQuads()))
}

const SET_ACTIVITY = (state, content) => {
  state.activity = content
}

const EXPORT_JSON_LD = (state) => {
  // create a prefix map and fill it
  const prefixMap = rdf.prefixMap({
    ex: rdf.namedNode('http://www.uned.es#example')
  })
  // TODO change this
  let quadStream = require('streamify-array')(state.n3store.getQuads())
  // let quadStream = state.dataset.toStream()

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

const EXPORT_TURTLE = (state) => {
  // create a prefix map and fill it

  const prefix = { prefixes: { ex: 'http://www.uned.es/example#' } }
  const writer = N3Writer(prefix)
  state.n3store.getQuads().forEach((quad) => {
    writer.addQuad(quad)
  })
  writer.end((error, result) => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'dataset.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    console.log(dataStr)
    console.log(error)
  })
}

const SET_VOCABULARY_STATE = (state, {vocabulary, active}) => {
  state.vocabularies[vocabulary].active = active
}

export default {
  ADD_QUAD_FROM_IRI,
  REMOVE_QUAD_FROM_IRI,
  REMOVE_RESOURCE_FROM_IRI,
  ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI,
  EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI,
  IMPORT_N3,
  ADD_N3,
  DEL_N3,
  SET_ACTIVITY,
  EXPORT_JSON_LD,
  EXPORT_TURTLE,
  SET_VOCABULARY_STATE
}
