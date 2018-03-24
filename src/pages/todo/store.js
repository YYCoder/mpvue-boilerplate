import Vue from 'vue'
import Vuex from 'vuex'
import { uuid, getStorage, find } from 'utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    unfinishedList: [],
    finishedList: []
  },
  getters: {
    unfinishedCount(state) {
      return state.unfinishedList.length
    },
    finishedCount(state) {
      return state.finishedList.length
    }
  },
  mutations: {
    /**
     * 更新整个列表
     * @param  {Object} state [Vuex实例的state配置]
     * @param  {Object} opt   [参数如下]
     *         {Array}  list  [要更新的列表]
     *         {String} type  [更新的类型，unfinished、finished]
     */
    update(state, { list = [], type }) {
      const listName = type === 'unfinished' ? 'unfinishedList' : 'finishedList'
      state[listName] = list
    },
    /**
     * 添加待办项
     * @param {Object} state [Vuex实例的state配置]
     * @param {Object} item  [待办项对象]
     */
    add(state, item) {
      state.unfinishedList.push(item)
    },
    /**
     * 删除指定未完成项
     * @param  {Object} state [Vuex实例的state配置]
     * @param  {Object} opt   [参数如下]
     *         {String} id    [要删除项目的id]
     *         {String} type  [要删除项目的类型，unfinished、finished]
     */
    delete(state, { id, type }) {
      const list = type === 'unfinished' ? state.unfinishedList : state.finishedList
      let itemIndex = ''
      const item = find(list, (ele, index) => {
        if (ele.id === id) {
          itemIndex = index
          return true
        }
      })[0]
      list.splice(itemIndex, 1)
    },
    /**
     * 更新单个项目状态
     * @param  {Object} state [Vuex实例的state配置]
     * @param  {Object} opt   [参数如下]
     *         {String} id    [更新项目的id]
     *         {String} type  [要更新项目的类型，unfinished、finished]
     */
    updateItem(state, { id, type }) {
      const originList = type === 'unfinished' ? 'unfinishedList' : 'finishedList'
      const newList = originList === 'unfinishedList' ? 'finishedList' : 'unfinishedList'
      let itemIndex = ''
      const item = find(state[originList], (ele, index) => {
        if (ele.id === id) {
          itemIndex = index
          return true
        }
      })[0]
      state[originList].splice(itemIndex, 1)
      state[newList].push(item)
    }
  },
  actions: {
    getUnfinished({ commit }) {
      // 模拟异步api调用
      return new Promise((res, rej) => {
        setTimeout(() => {
          commit('update', {
            list: getStorage('unfinished'),
            type: 'unfinished'
          })
          res()
        }, 1000)
      })
    },
    getFinished({ commit }) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          commit('update', {
            list: getStorage('finished'),
            type: 'finished'
          })
          res()
        }, 1000)        
      })
    }
  }
})

export default store
