// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Draggable from 'vuedraggable'
import router from './router'
import ElementUI from 'element-ui'
import Print from 'vue-print-nb'
import VueBarcode from '@chenfengyuan/vue-barcode'
import VueQr from 'vue-qr'

import './assets/style/element-variables.scss'
import './assets/style/variables.scss'
import './assets/icon/iconfont.css'
import store from './store'

import HeaderView from './components/structure/HeaderView'
import SelectorView from './components/structure/SelectorView'
import WorkspaceView from './components/structure/WorkspaceView'
import PropertyView from './components/structure/PropertyView'
import FooterView from './components/structure/FooterView'
import PreviewView from './components/structure/PreviewView'

import Thumbnail from './components/element/Thumbnail'
import JsonTree from './components/element/JsonTree'
import Selector from './components/element/Selector'
import Preview from './components/element/Preview'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(Print)

Vue.component('draggable', Draggable)
Vue.component('vue-barcode', VueBarcode)
Vue.component('vue-qr', VueQr)

Vue.component('header-view', HeaderView)
Vue.component('selector-view', SelectorView)
Vue.component('workspace-view', WorkspaceView)
Vue.component('property-view', PropertyView)
Vue.component('footer-view', FooterView)
Vue.component('preview-view', PreviewView)

Vue.component('thumbnail', Thumbnail)
Vue.component('json-tree', JsonTree)

Vue.component('selector', Selector)
Vue.component('preview', Preview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
