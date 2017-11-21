<template>
    <div :class="classes">
        <ul>
           <icon type="home"></icon>
        </ul>
    </div>
</template>
<script>
  const prefixCls = 'vui-menu';
  import Icon from '../icon'
  export default {
    name: "menu",
    data () {//数据
      return {}
    },
    props: {
      mode: {
        type: String,
        default: 'horizontal'
      },
      
    },
    components: {Icon},
    computed: {
      classes () {
        return `${prefixCls} ${prefixCls}-${this.mode}`;
      },
    },
    methods: {
      //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
    },
    watch: {
      //一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个属性。
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
