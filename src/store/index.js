import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    chooseId: '',
    chooseData: {},
    bindedKeys: [],
    jsonData: {},
    mode: 'report',
    theme: 'sea-green',
    themeColor: '#2e8b57',

    formActions: {
      list: [],
      pointer: 0,
      flag: true
    }
  },
  getters: {
    chooseId: state => state.chooseId,
    chooseData: state => state.chooseData,
    jsonData: state => state.jsonData,
    mode: state => state.mode,
    theme: state => state.theme,
    themeColor: state => state.themeColor,
    bindedKeys: state => state.bindedKeys,

    formActionsPointer: state => state.formActions.pointer,
    formActionPrevable: state => state.formActions.pointer > 0,
    formActionNextable: state =>
      state.formActions.pointer < state.formActions.list.length - 1,
    formActionsFlag: state => state.formActions.flag,
    formAction: state =>
      state.formActions.list[state.formActions.pointer].modelData,
    formActionId: state =>
      state.formActions.list[state.formActions.pointer].chooseId
  },
  actions: {
    RECORD_ACTION (context, payload) {
      setTimeout(() => {
        context.commit('PUSH_FORMACTIONS', payload)
      }, 0)
    }
  },
  mutations: {
    SET_CHOOSEID: (state, id) => {
      state.chooseId = id
    },
    SET_CHOOSEDATA: (state, data) => {
      state.chooseData = data
    },
    SET_JSONDATA: (state, data) => {
      state.jsonData = data
    },
    SET_MODE: (state, data) => {
      state.mode = data
    },
    SET_THEME: (state, data) => {
      state.theme = data
    },
    SET_THEMECOLOR: (state, data) => {
      state.themeColor = data
    },
    SET_BINDEDKEYS: (state, data) => {
      state.bindedKeys = data
    },
    PUSH_FORMACTIONS: (state, data) => {
      if (state.formActions.list.length > 100) {
        state.formActions.list.splice(0, 1)
      }
      state.formActions.list.push({
        modelData: data,
        chooseId: state.chooseId
      })
      state.formActions.pointer = state.formActions.list.length - 1
    },
    SET_FORMACTIONSFLAG: (state, data) => {
      state.formActions.flag = data
    },
    PREV_FORMACTION: state => {
      if (state.formActions.pointer !== 0) state.formActions.pointer--
    },
    NEXT_FORMACTION: state => {
      if (state.formActions.pointer + 1 < state.formActions.list.length) {
        state.formActions.pointer++
      }
    }
  }
})

export default store
