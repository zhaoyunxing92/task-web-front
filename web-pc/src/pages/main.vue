<template>
  <div class="web-main">
    <!--头部-->
    <TaskWebHead/>

    <datepicker future time></datepicker>
    <!--<datapicker open="dd"></datapicker>-->
    <!--<modal>-->
    <!---->
    <!--</modal>-->
    <!--内容-->
    <div class="content">
      <router-view/>
    </div>

  </div>
</template>
<script>
  import TaskWebHead from '../components/head/index';

  export default {
    name: "task-web-main",
    data () {//数据
      return {
        abc: true,
      }
    },
    components: {TaskWebHead},
    props: {
      //props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
    },
    computed: {
      //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果实例范畴之外的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。
    },
    methods: {
      //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
    },
    created(){
      //实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
    },
    mounted(){
      //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    },

  }
</script>
