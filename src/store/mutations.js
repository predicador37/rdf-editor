import DataFactory from 'rdf-ext'
import Parser from 'rdf-parser-n3'
import Serializer from 'rdf-serializer-jsonld-ext'
import StringStream from 'string-to-stream'

let N3Parser = Parser
let rdf = DataFactory
let string2stream = StringStream
let JsonLdSerializer = Serializer

const INITIALIZE_DATASET = (state, dataset) => {
  state.dataset = dataset
}

const ADD_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.dataset.add(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

const REMOVE_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.dataset.remove(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

const REMOVE_RESOURCE_FROM_IRI = (state, resource) => {
  console.log(resource)
  console.log(JSON.stringify(state.dataset.match(rdf.namedNode(resource))))
  state.dataset.removeMatches(rdf.namedNode(resource))
  // state.dataset.removeMatches(null, resource, null, null)
  // state.dataset.removeMatches(null, null, resource, null)
}

const ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI = (state, {subject, predicate, object}) => {
  console.log(subject)
  console.log(predicate)
  console.log(object)
  state.dataset.add(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
}

const IMPORT_N3 = (state, content) => {
  const turtleParser = new N3Parser({factory: rdf})
  let quadStream = turtleParser.import(string2stream(content))
  quadStream.on('data', (quad) => {
    console.log(quad.toString())
  })
  rdf.dataset().import(quadStream).then((dataset) => {
    state.dataset = dataset
    console.log(JSON.stringify(state.dataset))
  })
}

const EXPORT_JSON_LD = (state) => {
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

export default {
  INITIALIZE_DATASET,
  ADD_QUAD_FROM_IRI,
  REMOVE_QUAD_FROM_IRI,
  REMOVE_RESOURCE_FROM_IRI,
  ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI,
  IMPORT_N3,
  EXPORT_JSON_LD
}
