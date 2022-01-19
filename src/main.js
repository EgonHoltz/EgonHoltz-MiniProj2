import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSimpleAlert from "vue-simple-alert";
import BootstrapVue from 'bootstrap-vue'
import "bootstrap-vue/dist/bootstrap-vue.css"

import moment from 'moment';
import VueCurrencyInput from 'vue-currency-input'


Vue.use(BootstrapVue)
Vue.use(VueSimpleAlert)
Vue.use(VueCurrencyInput)

Vue.config.productionTip = false;


Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
