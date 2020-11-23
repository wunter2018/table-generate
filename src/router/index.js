import Vue from 'vue'
import Router from 'vue-router'
import Structure from '../components/structure/Structure.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Structure',
      component: Structure
    }
  ]
})
