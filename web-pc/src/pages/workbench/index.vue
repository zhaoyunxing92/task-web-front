<template>
  <div>
    <div class="content-card-left">
      <div class="title">
        <icon type="workbench"/>
        工作台
      </div>
      <div class="card-left-menu">
        <ul>
          <li :class=" $route.name===menu.name?'right-active':'' " @click="goToPath(menu.name)"
              v-for="(menu,index) in $store.state.workbenchMenus" :key="index">
            <icon :type="menu.icon"></icon>
            <span class="head-menu-name">{{menu.menuName}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-card-right">
      <div class="title">
        <icon :type="$route.meta.icon"/>
        <span>{{$route.meta.title}}</span>
      </div>
      <router-view/>
    </div>

  </div>
</template>
<script>
  export default {
    name: "task-workbench-main",
    data () {//数据
      return {}
    },
    computed: {
      //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果实例范畴之外的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。
    },
    methods: {
      goToPath(key){
        this.$router.push({name: key});
      }
    },
    watch: {
      //一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个属性。
    },
    created(){
      //实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
