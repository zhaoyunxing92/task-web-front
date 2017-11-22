<template>
    <div v-if="open" :class="classes">

        <!--日期模板-->
        <datepanel :startYear="startYear" :startMonth="startMonth"></datepanel>
    </div>
</template>
<script>
  const prefixCls = 'vui-datapicker';
  import vinput from '../input';
  import datepanel from './date-panel';
  export default {
    name: "datapicker",
    data () {//数据
      return {
        classes: `${prefixCls}`
      }
    },
    components: {vinput, datepanel},
    props: {
      open: {   //是否显示
        type: [Boolean, String],
        default: false
      },
      startYear: [String, Number], //开始年
      startMonth: [String, Number], //开始月
    },
  
    methods: {},
  }
</script>
