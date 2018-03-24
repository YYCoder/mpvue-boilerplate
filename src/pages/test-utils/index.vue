<template>
  <div class="root">
    <h1>测试页面</h1>
    <button @click="testFind">测试find</button>
    <button @click="testDeepClone">测试深克隆</button>
    <button @click="testToast">测试toast</button>
    <button @click="testLoading">测试loading</button>
    <button @click="testHideLoading">测试hide loading</button>
    <button @click="testPost">测试POST</button>
  </div>
</template>

<script>
import { find, deepClone, alert, toast, showLoading, hideLoading } from 'utils'
import { ajax, get, post } from 'http'
import { testAjax, testPost } from 'api'

export default {
  onShow() {
    console.log(this)
  },
  data() {
    return {
      name: '袁野',
      age: 22,
      hobbies: [{
        name: 'coding'
      }, {
        name: 'drumming'
      }]
    }
  },
  methods: {
    async testFind() {
      const arr = [{
        name: '哈哈',
        age: 10
      }, {
        name: '袁野',
        age: 20
      }, {
        name: '歪歪',
        age: 25
      }]
      // 测试支持async/await函数
      await ajax({
        url: testAjax,
        data: {
          test: 'hahaha'
        }
      }).then((res) => {
        alert('响应结束')
        console.log(res)
      })
      console.log('find：', find(arr, (ele, index, a) => {
        console.log(ele, index, a)
        return ele.age > 20
      }))
    },
    testDeepClone() {
      const obj = {
        name: '哈哈哈',
        data: [{
          age: 122,
          me: obj
        }]
      }
      console.log('深克隆：', deepClone(obj))
      console.log(deepClone(obj) === obj)
    },
    testToast() {
      toast('标题')
    },
    testLoading() {
      // showLoading('加载中哈哈哈')
      showLoading({
        title: '试试',
        mask: false
      })
    },
    testHideLoading() {
      hideLoading()
    },
    testPost() {
      post({
        url: testPost,
        data: {
          test: 'test'
        }
      }).then(({ code, data, message }) => {
        alert(message)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~static/css/normalize";
$bgColor: #eee;

.root {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 100vh;
  text-align: center;
  background: $bgColor;
  button {
    padding: 3px 10px;
    letter-spacing: 10rpx;
    background: red;
  }
}

</style>