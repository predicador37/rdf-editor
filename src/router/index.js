import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditorHome',
      component: EditorHome
    }
  ]
})
