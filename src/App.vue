<script>
import { uuid } from 'utils'

export default {
  // 这些小程序的钩子钩子还是都支持的
  onShow() {
    console.log('App on show')
  },
  onLaunch() {
    console.log('App on launch')
    // Mock数据
    wx.setStorageSync('unfinished', [{
      id: uuid(),
      title: '练鼓',
      content: '回家练鼓哈哈哈哈回家练鼓哈哈哈哈回家练鼓哈哈哈哈回家练鼓哈哈哈哈回家练鼓哈哈哈哈回家练鼓哈哈哈哈',
      createTime: '2018-03-18 12:00:01'
    }, {
      id: uuid(),
      title: '哈哈',
      content: '嘿嘿嘿嘿嘿嘿',
      createTime: '2018-01-18 12:00:01'
    }, {
      id: uuid(),
      title: '瞎写',
      content: '爱空间当爱空单哈赛看会奥孔金擦考',
      createTime: '2018-02-18 12:00:01'
    }])

    wx.setStorageSync('finished', [{
      id: uuid(),
      title: '敲代码',
      content: '敲代码敲代码敲代码敲代码敲代码敲代码敲代码敲代码敲代码敲代码敲代码敲代码',
      createTime: '2018-03-20 12:00:01'
    }, {
      id: uuid(),
      title: '睡觉',
      content: '睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉睡觉',
      createTime: '2018-03-22 12:00:01'
    }])    
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
