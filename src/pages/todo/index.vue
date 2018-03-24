<template>
  <div class="todo">
    <h3 class="header">Todo List Demo 1.0</h3>
    <div class="unfinished-list">
      <p class="unfinished-header">
        <span class="unfinished-title">未完成</span>
        <span class="unfinished-count">共{{ unfinishedCount }}件</span>
      </p>
      <div v-for="item in unfinishedList" :key="id" wx:key="id">
        <todo-item :item="item" :type="'unfinished'"/>
      </div>
    </div>
    <div class="finished-list">
      <p class="finished-header">
        <span class="finished-title">已完成</span>
        <span class="finished-count">共{{ finishedCount }}件</span>
      </p>
      <div v-for="item in finishedList" :key="id" wx:key="id">
        <todo-item :item="item" :type="'finished'"/>
      </div>
    </div>
    <div class="options">
      <ui-button :text="'添加'" @ui-click="add" />
      <ui-button :text="'清空已完成'" @ui-click="removeAllFinished" />
      <ui-button :text="'清空未完成'" @ui-click="removeAllUnfinished" />
    </div>

    <input-modal :is-show-modal="isShowModal" @reset="reset" />
 </div>
</template>

<script>
import { formatTime, find, toast, alert, showLoading, hideLoading, uuid } from 'utils'
// Vuex统一状态管理
import store from './store'
import { mapState } from 'vuex'
// 导入组件
import todoItem from './components/todo-item'
import uiButton from '@/components/button'
import inputModal from './components/input-modal'

export default {
  async onShow() {
    await this.getData()
  },
  async onPullDownRefresh() {
    await this.getData()
  },
  components: {
    todoItem,
    uiButton,
    inputModal
  },
  data() {
    return {
      isShowModal: false // 是否展示输入代办信息弹层
    }
  },
  computed: {
    unfinishedList: () => store.state.unfinishedList,
    finishedList: () => store.state.finishedList,
    unfinishedCount: () => store.getters.unfinishedCount,
    finishedCount: () => store.getters.finishedCount
  },
  methods: {
    async getData() {
      // 获取数据
      showLoading()
      await store.dispatch('getUnfinished')
      await store.dispatch('getFinished')
      hideLoading()
    },
    add() {
      this.isShowModal = true
    },
    // 重置输入弹层
    reset() {
      this.isShowModal = false
    },
    removeAllUnfinished() {
      alert({
        content: '确认要清空吗',
        success({ confirm, cancel }) {
          confirm && store.commit('update', {
            list: [],
            type: 'unfinished'
          })
        }
      })      
    },
    removeAllFinished() {
      alert({
        content: '确认要清空吗',
        success({ confirm, cancel }) {
          confirm && store.commit('update', {
            list: [],
            type: 'finished'
          })
        }
      })      
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~static/css/normalize";
@import "~static/css/base";

.todo {
  background: $bgColor;
  height:100vh;
  overflow-y:scroll;
  color: $fontBlack;
  .header {
    text-align: center;
    line-height:50px;
  }
  .unfinished-list, .finished-list {
    padding: 0 10px 10px;
    border-top: 1px dotted $fontGray;
    .unfinished-header, .finished-header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 40px;
      .unfinished-title, .finished-title {
      }
      .unfinished-count, .finished-count {
      }
    }
  }
  .options {
    border-top: 1rpx dotted $fontGray;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
}
</style>