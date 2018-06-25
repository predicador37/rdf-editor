import getters from '../getters'
import DataFactory from 'rdf-ext'

let rdf = DataFactory

describe('getters', () => {
  test('displayItems returns the first 20 items from state.list', () => {
    let dataset = rdf.dataset([rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(baseUrl + 'Analista')), rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value),
      rdf.namedNode(RdfConstructs.owl_Class.value)), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Rol en el proyecto')), rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')), rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista'))])
const state = {
dataset: dataset
  }
    const result = getters.getTriplesMatchingSubject(state)
expect(result.length).toEqual(20)
    result.forEach((item, i) => { ❹
expect(item).toEqual(numberArray[i])
    })
  })
})
