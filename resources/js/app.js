require('./bootstrap');

window.Vue = require('vue');

Vue.component('home-page', require('./components/HomePage.vue').default);
Vue.component('navbar-main', require('./components/NavbarMain.vue').default);

const app = new Vue({
    el: '#app',
});