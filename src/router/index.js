import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'
import Model from '@/components/Model'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditorHome',
      component: EditorHome
    },
    {
      path: '/model',
      name: 'Model',
      component: Model
    }
  ]
})
