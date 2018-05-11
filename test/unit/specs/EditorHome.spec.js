import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import EditorHome from '@/components/EditorHome'
import { mount, createLocalVue } from '@vue/test-utils';

describe('EditorHome.vue', () => {
  let wrp;
  const routes = [
    { path: '/', name: 'EditorHome' }
  ]

  const router = new VueRouter({ routes });
  const localVue = createLocalVue()

  localVue.use(Vuetify)
  localVue.use(VueRouter);

  wrp = mount(EditorHome, {
    localVue: localVue,
    router
  })

  it('should render correct contents', () => {
    let header = wrp.find('.display-3')
    expect(header.exists()).toBe(true)
    expect(header.is('h3')).toBe(true);
    expect(header.text())
    .toEqual('Editor de ontologías de la UNED')
  })
})
