import Vue from "vue";
import App from "./App";
import store from "./vuex/store";
import {routers} from "./router";
import VueRouter from "vue-router";
import Icon from "../../core/components/icon";
import Menu from "../../core/components/menu";
import datePicker from "../../core/components/datepicker";

Vue.component(Icon.name, Icon);
Vue.component(Menu.name, Menu);
Vue.component(datePicker.name, datePicker);


Vue.config.productionTip = true;

const RouterConfig = {
  //mode: 'history',
  routes: routers
};
Vue.use(VueRouter);
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  let title = to.meta.title || "task";
  window.document.title = title;
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {App},
  mounted () {
    // 菜单
    this.$store.commit('setMenuList');
  },
  watch: {
    // '$route' (to) {
    //   //登录路由删除本地缓存
    //   if(to.path==="/login"){
    //     localStorage.removeItem("userInfo")
    //   }
    //   // this.$store.commit('addOpendList', to);
    // },
    // '$store.state.currentOrgId':function(newVal,oldVal){
    //   // window.location.reload();
    //
    //   //  this.$router.push({
    //   //   path: 'details'
    //   // });
    // }
  },

});
