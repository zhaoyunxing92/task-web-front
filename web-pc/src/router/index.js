/**
 * @author :  sunny
 * @date : 2017.11.19 16:50
 * @description :  页面路由模块
 */
'use strict';


const HelloWorld = () => import('../components/HelloWorld');


/**入口文件*/
const Main = () => import(/* webpackChunkName: "main" */ '../pages/main');

/**我的工作台*/
const WorkbenchIndex = () => import(/* webpackChunkName: "workbench-index" */'../pages/workbench/index');

const AssignedToMe = () => import(/* webpackChunkName: "workbench-index" */'../pages/workbench/assignedToMe');

/**
 * 概览
 * @constructor
 */
const Outline = () => import(/* webpackChunkName: "workbench-index" */'../pages/home/outline');

/**
 * 任务列表
 * @constructor
 */
const Task = () => import(/* webpackChunkName: "workbench-index" */'../pages/task/index');

/**
 * 设置
 * @constructor
 */
const Setting = () => import(/* webpackChunkName: "Setting" */'../pages/setting/index');
const SettingOrgInfo = () => import(/* webpackChunkName: "Setting-orgInfo" */'../pages/setting/orgInfo');
const SettingOrgProjects = () => import(/* webpackChunkName: "Setting-orgProjects" */'../pages/setting/orgProjects');
const SettingOrgUsers = () => import(/* webpackChunkName: "Setting-orgUsers" */'../pages/setting/orgUsers');
const SettingOrgRole = () => import(/* webpackChunkName: "Setting-orgRole" */'../pages/setting/orgRole');
const SettingOrgThirdparty = () => import(/* webpackChunkName: "Setting-orgThirdparty" */'../pages/setting/orgThirdparty');
const SettingOrgAdvance = () => import(/* webpackChunkName: "Setting-orgAdvance" */'../pages/setting/orgAdvance');

/**
 * 账号信息
 * @constructor
 */
const Account = () => import(/* webpackChunkName: "account" */'../pages/account/index');
const AccountInfo = () => import(/* webpackChunkName: "account-info" */'../pages/account/info');
const AccountSetting = () => import(/* webpackChunkName: "account-setting" */'../pages/account/setting');
const AccountNotification = () => import(/* webpackChunkName: "account-notification" */'../pages/account/notification');
/**
 * 其他路由
 * @type {[*]}
 */
export const otherRouter = [
  {
    path: '/hello',
    name: 'home',
    meta: {title: 'demo'},
    component: HelloWorld,
  },
  {
    path: '/',
    redirect: '/main',
  },
];
/**
 * 主要路由，包含菜单
 * @type {[*]}
 */
export const appMain = [
  {
    path: "/main",
    name: 'app-main',
    meta: {title: '首页'},
    redirect: '/outline',
    component: Main,
    children: [
      {
        path: '/workbench',
        name: 'app-workbench',
        workbenchMenu: true,
        meta: {title: '工作台', icon: 'home', menuName: '工作台',parent: 'app-workbench'},
        redirect: '/workbench/assigned',
        // component: { template: '<router-view></router-view>' },
        component: WorkbenchIndex,
        children: [
          {
            path: 'assigned',
            //  alias: ['abc'],
            name: 'workbench-assigned',
            meta: {title: '指给我的', icon: 'at', menuName: '指给我的',parent: 'app-workbench'},
            component: AssignedToMe,
          },
          {
            path: 'create',
            name: 'workbench-me-create',
            meta: {title: '我提出的', icon: 'plus', menuName: '我提出的',parent: 'app-workbench'},
            component: AssignedToMe,
          },
          {
            path: 'follow',
            name: 'workbench-me-follow',
            meta: {title: '我关注的', icon: 'star', menuName: '我关注的',parent: 'app-workbench'},
            component: AssignedToMe,
          },
          {
            path: 'finish',
            name: 'workbench-me-finish',
            meta: {title: '我完成的', icon: 'document-text', menuName: '我完成的',parent: 'app-workbench'},
            component: AssignedToMe,
          }
        ]
      },
      {
        path: '/outline',
        name: 'app-home',
        meta: {title: '概览', icon: 'navicon-round', menuName: '概览',parent: 'app-home'},
        component: Outline
      },
      {
        path: '/tasks',
        name: 'app-tasks',
        meta: {title: '任务列表', icon: 'document-text', menuName: '任务',parent: 'app-tasks'},
        component: Task
      },
      {
        path: '/setting',
        name: 'app-setting',
        settingMenu: true,
        meta: {title: '设置', icon: 'document-text', menuName: '设置', parent: 'app-setting'},
        component: Setting,
        redirect: '/setting/orgInfo',
        children: [
          {
            path: 'orgInfo',  //组织信息
            name: 'app-setting-org-info',
            component: SettingOrgInfo,
            meta: {title: '团队信息', icon: 'document-text', menuName: '团队信息', parent: 'app-setting'},
          },
          {
            path: 'projects',
            name: 'app-setting-org-project',
            component: SettingOrgProjects,
            meta: {title: '团队项目', icon: 'document-text', menuName: '团队项目', parent: 'app-setting'},
          },
          {
            path: 'users',  //组织信息
            name: 'app-setting-org-user',
            component: SettingOrgUsers,     //SettingOrgRole
            meta: {title: '团队成员', icon: 'document-text', menuName: '团队成员', parent: 'app-setting'},
          },

          {
            path: 'role',  //组织信息
            name: 'app-setting-org-role',
            component: SettingOrgRole,     //thirdparty
            meta: {title: '团队角色', icon: 'document-text', menuName: '团队角色', parent: 'app-setting'},
          },
          {
            path: 'thirdparty',  //组织信息
            name: 'app-setting-org-thirdparty',
            component: SettingOrgThirdparty,     //thirdparty
            meta: {title: '第三方数据', icon: 'document-text', menuName: '第三方', parent: 'app-setting'},
          },
          {
            path: 'advance',  //高级设置
            name: 'app-setting-org-advance',
            component: SettingOrgAdvance,
            meta: {title: '高级设置', icon: 'document-text', menuName: '高级设置', parent: 'app-setting'},
          }
        ]
      },
      {
        path: '/account',
        name: 'app-account',
        hide: true,
        meta: {title: '个人中心', icon: 'navicon-round', menuName: '个人中心'},
        component: Account,
        redirect: '/account/info',
        children: [
          {
            path: '/account/info',
            name: 'account-info',
            meta: {title: '账号信息', icon: 'at', menuName: '账号'},
            component: AccountInfo,
          },
          {
            path: '/account/setting',
            name: 'account-setting',
            meta: {title: '账号设置', icon: 'plus', menuName: '设置'},
            component: AccountSetting,
          },
          {
            path: '/account/notification',
            name: 'account-notification',
            meta: {title: '通知提醒', icon: 'plus', menuName: '通知'},
            component: AccountNotification,
          },
        ]
      },
    ]
  }
];

export const routers = [
  ...otherRouter,
  ...appMain,
];
