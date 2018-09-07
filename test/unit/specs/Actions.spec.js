import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'

let rdf = DataFactory
let baseUrl = consts.baseUrl
// TODO refactor all tests to n3 store (no more match)
describe('actions', () => {
  test('add triple to store', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let beforeSize = store.state.n3store.size
    // store.state.n3store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Pepito_Perez'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(baseUrl + 'Programador')))
    store.dispatch('addQuad', {subject: baseUrl + 'Pepito_Perez', predicate: RdfConstructs.rdf_type.value, object: baseUrl + 'Programador'})
    let afterSize = store.state.n3store.size
    let expected = beforeSize + 1
    let actual = afterSize
    expect(actual).toBe(expected)
  })

  test('delete triples matching subject and object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let beforeSize = store.state.n3store.size
    store.dispatch('removeResource', baseUrl + 'Analista')
    let afterSize = store.state.n3store.size
    let expected = beforeSize - 7
    let actual = afterSize
    expect(actual).toBe(expected)
  })

  test('edit triples matching subject', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldValue = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analista')).length
    let expectedOldValue = 5
    let actualNewValue = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analyst')).length
    let expectedNewValue = 0
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
    store.dispatch('editResource', {oldResource: baseUrl + 'Analista', newResource: baseUrl + 'Analyst'})
    actualOldValue = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analista')).length
    expectedOldValue = 0
    actualNewValue = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analyst')).length
    expectedNewValue = 5
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
  })

  test('edit triples matching object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldValue = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analista')).length
    let expectedOldValue = 2
    let actualNewValue = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analyst')).length
    let expectedNewValue = 0
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
    store.dispatch('editResource', {oldResource: baseUrl + 'Analista', newResource: baseUrl + 'Analyst'})
    actualOldValue = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analista')).length
    expectedOldValue = 0
    actualNewValue = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analyst')).length
    expectedNewValue = 2
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
  })
})
