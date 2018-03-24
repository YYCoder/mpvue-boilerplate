<template>
  <div class="todo-item">
    <div class="top-info">
      <div class="title single-line">{{ item.title }}</div>
      <div class="create-time">{{ item.createTime }}</div>
    </div>
    <div class="content">{{ item.content }}</div>
    <div class="operation">
      <ui-button v-if="typeMap[type] === 0" :text="'完成'" @ui-click="finishItem(item.id)" />
      <ui-button :text="'删除'" @ui-click="deleteItem(item.id, type)" />
    </div>
  </div>
</template>

<script>
import { alert } from 'utils'
import uiButton from "@/components/button"
import store from '../store'

export default {
  components: {
    uiButton
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    type: {
      type: String,
      default: 'unfinished'
    }
  },
  data() {
    return {
      typeMap: {
        'unfinished': 0,
        'finished': 1
      }
    }
  },
  methods: {
    finishItem(id) {
      store.commit('updateItem', {
        type: 'unfinished',
        id
      })
    },
    deleteItem(id, type) {
      alert({
        content: '确认要删除吗',
        success({ confirm, cancel }) {
          confirm && store.commit('delete', { type, id })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~static/css/base";

.todo-item {
  background: $itemBgColor;
  padding: 0 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px 1px #ccc;
  border-radius: 5px;
  .top-info {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 0 0;
    .title {
      max-width:60%;
      height: 30px;
    }
    .create-time {
      font-size: 14px;
      text-align: right;
    }
  }
  .content {
    padding:10px 0;
    font-size:14px;
  }
  .operation {
    border-top: 1px dotted #ddd;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>