/**
 * @author :  sunny
 * @date : 2017.11.19 16:54
 * @description : 状态管理
 */
import Vue from "vue";
import Vuex from "vuex";
import {appMain} from "../router";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: { //state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态。
    orgs: [],
    currentOrgId: '',//当前组织
    menuTheme: '', // 菜单主题
    headMenus: [], //头部菜单
    workbenchMenus: [], //工作台菜单
    settingMenus: [],//设置菜单
    pageOpenedList: [],   //默认打开页面],  // 面包屑数组
    currentPageName: '',//当前展开的菜单名称
    openedSubmenuArr: [],  // 要展开的菜单数组
  },
  actions: {},
  mutations: {
    //添加
    addOrgs(state, obj){
      state.orgs.push(obj);
    },
    setCucurrentOrgId(state, uid){
      state.currentOrgId = uid;
    },
    setMenuList (state){
      let headMenus = [];
      let workbenchMenus = [];
      let settingMenus = [];
      appMain.forEach(item => {
        if (item.children.length > 0) {

          item.children.forEach(headMenu => {
            //头部导航
            if (!headMenu.hide) {
              headMenus.push({
                name: headMenu.name,
                icon: headMenu.meta.icon,
                menuName: headMenu.meta.menuName,
                right: headMenu.meta.right,
                iconColor: headMenu.meta.iconColor,
                parent: headMenu.meta.parent
              });

            }
            //左侧菜单 ---工作台
            if (headMenu.workbenchMenu && headMenu.children.length > 0) {
              headMenu.children.forEach(leftMenu => {
                workbenchMenus.push({
                  name: leftMenu.name,
                  icon: leftMenu.meta.icon,
                  menuName: leftMenu.meta.menuName,
                  iconColor: leftMenu.meta.iconColor,
                  parent: headMenu.meta.parent
                });
              })
            }
            //左侧菜单 ---setting
            if (headMenu.settingMenu && headMenu.children.length > 0) {
              headMenu.children.forEach(leftMenu => {
                settingMenus.push({
                  name: leftMenu.name,
                  icon: leftMenu.meta.icon,
                  menuName: leftMenu.meta.menuName,
                  iconColor: leftMenu.meta.iconColor,
                  parent: headMenu.meta.parent
                });
              })
            }

          });
        }


      });
      state.headMenus = headMenus;
      state.workbenchMenus = workbenchMenus;
      state.settingMenus = settingMenus;
      // state.orgs.push({'name':'test'})
    }
  },
  getters: {},
  modules: {}
});
export default store
