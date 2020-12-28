import Vue from 'vue'
import App from './App.vue'

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.config.productionTip = false;

Vue.use(VueToast);



new Vue({
  render: h => h(App),
}).$mount('#app')
