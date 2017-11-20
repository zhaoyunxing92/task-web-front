/**
 * @author :  sunny
 * @date : 2017.11.19 16:50
 * @description :  页面路由模块
 */
'use strict';


const HelloWorld = () => import('../components/HelloWorld');


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
  }
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...otherRouter,
  // ...appMain,
];
