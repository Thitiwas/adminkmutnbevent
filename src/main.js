import Vue from 'vue'
import App from './App'

new Vue({
  // router,
  template: '<App/>',
  components: { App },
  el: '#app',
  render: h => h(App) // Start component App.vue
}).$mount('#app')
