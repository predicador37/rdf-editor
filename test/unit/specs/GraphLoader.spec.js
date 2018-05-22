import GraphLoader from '@/components/GraphLoader'
import { mount, createLocalVue } from '@vue/test-utils'
const testData = require('rdf-test-data')

describe('GraphLoader.vue', () => {
  let wrp
  const localVue = createLocalVue()
  wrp = mount(GraphLoader, {
    localVue: localVue,
    propsData: {title: 'Titulo'}
  })

  it('should render correct contents', () => {
    let div = wrp.find('.jbtn-file')
    expect(div.exists()).toBe(true)
    expect(div.text())
    .toEqual('Titulo')
  })
  it('should parse turtle text into dataset object', () => {
    wrp.vm.fileSelected(testData)
  })
})
