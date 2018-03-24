import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

// page.json配置
export default {
  // 这个字段下的数据会被填充到page.json
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: "Todo Demo",
  }
}