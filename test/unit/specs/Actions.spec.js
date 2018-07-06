import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'

let rdf = DataFactory
let baseUrl = consts.baseUrl

describe('actions', () => {
  test('delete triples matching subject and object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualSubject = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analista')).length
    let actualObject = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analista')).length
    let expectedObject = 2
    let expectedSubject = 5
    expect(actualSubject).toBe(expectedSubject)
    expect(actualObject).toBe(expectedObject)
    store.dispatch('removeResource', baseUrl + 'Analista')
    actualSubject = store.state.dataset.match(rdf.namedNode(baseUrl + 'Analista')).length
    actualObject = store.state.dataset.match(null, null, rdf.namedNode(baseUrl + 'Analista')).length
    expectedSubject = 0
    expectedObject = 0
    expect(actualSubject).toBe(expectedSubject)
    expect(actualObject).toBe(expectedObject)
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
