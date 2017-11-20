import Vue from 'vue'
import App from './App'
import {routers} from "./router";
import VueRouter from "vue-router";
import icon from '../../core/components/icon';
Vue.component('icon', icon);
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
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// });
new Vue({
  el: '#app',
  router,
  // store: store,
  template: '<App/>',
  components: {App},
  mounted () {
    //this.currentPageName = this.$route.name;
    // this.$store.commit('initCachepage');
    // 菜单
   // this.$store.commit('setMenuList');
    //this.$store.commit('setOpenedList');
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
  }
})
