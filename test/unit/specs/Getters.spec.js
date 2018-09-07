import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'
import getters from '../../../src/store/getters'

let rdf = DataFactory
let baseUrl = consts.baseUrl

describe('getters', () => {
  test('get properties', () => {
    Vue.use(Vuex)
    console.log('jest test')
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    const results = getters.getDefaultResources(store.state)('property')
    console.log(JSON.stringify(results))
  })
})
