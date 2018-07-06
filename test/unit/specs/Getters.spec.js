import getters from '../../../src/store/getters'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'

let rdf = DataFactory
let baseUrl = consts.baseUrl
let dataset = rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value),
  rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value),
  rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value),
  rdf.namedNode(baseUrl + 'Analista')), rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value),
  rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Rol en el proyecto')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')), rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista'))])

const {
  getTriplesMatchingSubject,
  getTriplesMatchingObject
} = getters

describe('getters', () => {
  test('get triples matching object', () => {
    const state = {
      dataset: dataset
    }
    const results = getTriplesMatchingObject(state)(baseUrl + 'Analista')
    let expected = 2
    let actual = results.length
    expect(expected).toEqual(actual)
  })

  test('get triples matching subject', () => {
    const state = {
      dataset: dataset
    }
    const results = getTriplesMatchingSubject(state)(baseUrl + 'Analista')
    let expected = 5
    let actual = results.length
    expect(expected).toEqual(actual)
  })
})
