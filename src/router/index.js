import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'
import Model from '@/components/Model'
import ImportExport from '@/components/ImportExport'

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
    },
    {
      path: '/import-export',
      name: 'ImportExport',
      component: ImportExport
    }
  ]
})
