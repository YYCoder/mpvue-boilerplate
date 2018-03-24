<template>
<div class="input-modal-wrapper" v-show="isShowModal">
  <div class="input-modal" :class="{ 'show': isShowModal }">
    <div class="input-container">
      <input type="text" name="title" placeholder="请输入待办项名称" class="input" v-model="title" />
    </div>
    <div class="input-container">
      <textarea v-model="content" placeholder="请输入代办详细内容" class="content" />
    </div>
    <div class="btns">
      <ui-button :text="'确认添加'" @ui-click="confirm" />
      <ui-button :text="'取消'" @ui-click="reset" />
    </div>
  </div>
  <div class="mask" :class="{ 'show': isShowModal }" @click="reset"></div>
</div>
</template>

<script>
import { uuid, formatTime, toast } from 'utils'
import store from '../store'
// 导入组件
import uiButton from '@/components/button'

export default {
  data() {
    return {
      // 要添加的待办项内容
      title: '',
      content: ''
    }
  },
  components: {
    uiButton
  },
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      const { title, content } = this
      if (!title || !content) {
        toast('请将信息填写完整再提交')
        return
      }
      const item = {
        createTime: formatTime(new Date),
        title,
        content,
        id: uuid()
      }
      store.commit('add', item)
      // 关闭弹层并初始化值
      this.reset()
    },
    reset() {
      this.title = ''
      this.content = ''
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
@import "~static/css/base";

.input-modal-wrapper {
  .mask {  
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0);
    opacity: 0;
    transition: opacity 0.3s ease;
    visibility: hidden;
    &.show {
      opacity: 0.3;
      visibility: visible;
    }
  }
  .input-modal {
    width:70vw;
    position:fixed;
    top:30vh;
    background: $itemBgColor;
    padding:10px;
    border-radius:10px;
    left:50%;
    transform:translateX(-50%);
    box-shadow:0 2px 5px 1px #666;
    transition: opacity 0.3s ease;
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
      z-index: 100;
    }
    .input-container {
      margin: 10px 0;
      .input, .content {
        font-size:16px;
        background:#fff;
        padding:5px 10px;
        border-radius:5px;
        &.content {
          width:100%;
          box-sizing:border-box;
        }
      }
    }
    .btns {
      padding-top:10px;
      text-align:right;
      border-top:1px dotted #ccc;
      margin-top:10px;
    }
  }
}
</style>
