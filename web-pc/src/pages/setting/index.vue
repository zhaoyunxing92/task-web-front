<template>
  <div>
    <div class="content-card-left">
      <div class="title">团队设置</div>

      <div class="card-left-menu">
        <ul>
          <li :class=" $route.name===menu.name?'right-active':'' " @click="goToPath(menu.name)"
              v-for="(menu,index) in $store.state.settingMenus" :key="index">
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
    name: "task-setting-main",
    data () {//数据
      return {}
    },
    props: {
      //props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
    },
    computed: {
      //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果实例范畴之外的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。
    },
    methods: {
      goToPath(key){
        this.$router.push({name: key});
      }
    },
    beforeCreate(){
      //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
    },
    created(){
      //实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
    },
    mounted(){
      //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    },
    beforeUpdate () {
      //  数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。该钩子在服务器端渲染期间不被调用。
    },
    updated(){
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
    },
    beforeDestroy(){
      //实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    destroyed(){
      //Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
