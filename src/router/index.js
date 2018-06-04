import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'
import ModelContainer from '@/components/ModelContainer'
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
      name: 'ModelContainer',
      component: ModelContainer
    },
    {
      path: '/import-export',
      name: 'ImportExport',
      component: ImportExport
    }
  ]
})
