import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import '@fortawesome/fontawesome-pro/scss/fontawesome.scss'
import '@fortawesome/fontawesome-pro/scss/regular.scss'
import '@fortawesome/fontawesome-pro/scss/light.scss'
import './vue-global';


Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
