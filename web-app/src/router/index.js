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
const WorkbenchIndex=()=>import(/* webpackChunkName: "workbench-index" */'../pages/workbench/index');

const AssignedToMe=()=>import(/* webpackChunkName: "workbench-index" */'../pages/workbench/assignedToMe');

/**
 * 概览
 * @constructor
 */
const Outline=()=>import(/* webpackChunkName: "workbench-index" */'../pages/home/outline');

/**
 * 任务列表
 * @constructor
 */
const Task=()=>import(/* webpackChunkName: "workbench-index" */'../pages/task/index');

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
    title: '首页',
    name: 'app-main',
    meta: {title: '首页'},
    redirect: '/outline',
    component: Main,
    children: [
      {
        path: '/workbench',
        name: 'app-workbench',
        workbenchMenu: true,
        meta: {title: '工作台', icon: 'home', menuName: '工作台'},
        redirect: '/workbench/assigned',
        component: WorkbenchIndex,
        children: [
          {
            path: 'assigned',
            //  alias: ['abc'],
            name: 'workbench-assigned',
            meta: {title: '指给我的', icon: 'at', menuName: '指给我的'},
            component: AssignedToMe,
          },
          {
            path: 'create',
            name: 'workbench-me-create',
            meta: {title: '我提出的', icon: 'plus', menuName: '我提出的'},
            component: AssignedToMe,
          },
          {
            path: 'follow',
            name: 'workbench-me-follow',
            meta: {title: '我关注的', icon: 'star', menuName: '我关注的'},
            component: AssignedToMe,
          },
          {
            path: 'finish',
            name: 'workbench-me-finish',
            meta: {title: '我完成的', icon: 'document-text', menuName: '我完成的'},
            component: AssignedToMe,
          }
        ]
      },

      {
        path: '/outline',
        name: 'app-home',
        meta: {title: '概览', icon: 'navicon-round', menuName: '概览'},
        component: Outline
      },
      {
        path: '/tasks',
        name: 'app-tasks',
        meta: {title: '任务列表', icon: 'document-text', menuName: '任务'},
        component: Task
      },
      // {
      //   path: '/projects',
      //   name: 'app-projects',
      //   meta: {title: '项目', icon: 'document-text', menuName: '项目'},
      //   component: Project
      // },
      // {
      //   path: '/setting',
      //   name: 'app-setting',
      //   settingMenu: true,
      //   meta: {title: '设置', icon: 'document-text', menuName: '设置'},
      //   component: Setting,
      //   redirect: '/setting/orgInfo',
      //   children: [
      //     {
      //       path: 'orgInfo',  //组织信息
      //       name: 'app-setting-org-info',
      //       component: SettingOrgInfo,
      //       meta: {title: '团队信息', icon: 'document-text', menuName: '团队信息'},
      //     },
      //     {
      //       path: 'projects',
      //       name: 'app-setting-org-project',
      //       component: SettingOrgProjects,
      //       meta: {title: '团队项目', icon: 'document-text', menuName: '团队项目'},
      //     },
      //     {
      //       path: 'users',  //组织信息
      //       name: 'app-setting-org-user',
      //       component: SettingOrgUsers,     //SettingOrgRole
      //       meta: {title: '团队成员', icon: 'document-text', menuName: '团队成员'},
      //     },
      //
      //     {
      //       path: 'role',  //组织信息
      //       name: 'app-setting-org-role',
      //       component: SettingOrgRole,     //thirdparty
      //       meta: {title: '团队角色', icon: 'document-text', menuName: '团队角色'},
      //     },
      //     {
      //       path: 'thirdparty',  //组织信息
      //       name: 'app-setting-org-thirdparty',
      //       component: SettingOrgThirdparty,     //thirdparty
      //       meta: {title: '第三方数据', icon: 'document-text', menuName: '第三方'},
      //     },
      //     {
      //       path: 'advance',  //高级设置
      //       name: 'app-setting-org-advance',
      //       component: SettingOrgAdvance,
      //       meta: {title: '高级设置', icon: 'document-text', menuName: '高级设置'},
      //     }
      //   ]
      // },
      // {
      //   path: '/orgs',
      //   name: 'app-toggle-org',
      //   meta: {title: '团队列表', icon: 'document-text', menuName: '切换团队'},
      //   component: OrgList
      // },
      // {
      //   path: '/add-user',
      //   name: 'app-add-org',
      //   meta: {title: '邀请好友', icon: 'document-text', menuName: '邀请好友'},
      //   component: AddOrgUser
      // },
      // {
      //   path: '/add-org',
      //   name: 'app-user-logout',
      //   redirect: '/login',
      //   meta: {title: '退出', icon: 'power', menuName: '', iconColor: 'red'},
      //   component: AddOrg
      // },
      // {
      //   path: '/userInfo',
      //   name: 'app-user-info',
      //   meta: {title: '我的信息', icon: 'document-text', menuName: '我的信息'},
      //   component: AppMe
      // },
      // {
      //   path: '/add-org',
      //   name: 'app-create-org-main',
      //   redirect: '/create/org',
      //   meta: {title: '创建团队', icon: 'document-text', menuName: '创建团队'},
      // }
    ]
  }
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...otherRouter,
  ...appMain,
];
