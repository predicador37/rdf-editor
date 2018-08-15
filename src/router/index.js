import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'
import ModelContainer from '@/components/ModelContainer'
import ImportExport from '@/components/ImportExport'
import Activity from '@/components/Activity'
import Vocabulary from '@/components/Vocabulary'
import Sparql from '@/components/Sparql'

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
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/vocabulary',
      name: 'Vocabulary',
      component: Vocabulary
    },
    {
      path: '/sparql',
      name: 'Sparql',
      component: Sparql
    }
  ]
})
