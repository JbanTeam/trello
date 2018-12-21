// npx @vue/cli create projectname
// npx @vue/cli add vuetify
// npm i feathers-vuex --save
// npm i @feathersjs/fethers @feathersjs/socketio-client socket.io-client @feathersjs/authentication-client --save

import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
