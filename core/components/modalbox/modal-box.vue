<template>
    <div :class="classes">
        <div style="width: 100px;height: 100px;background-color: white;z-index: 1000">
            dsfds
        </div>
    </div>

</template>
<script>
  const prefixCls = 'vui-modal';
  export default {
    name: "modal", //模态框
    data () {//数据
      return {}
    },
    props: {},
    computed: {
      classes () {
        return `${prefixCls}`;
      },
    },
    methods: {
      //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
    },
    watch: {
      //一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个属性。
    },
  }
</script>
