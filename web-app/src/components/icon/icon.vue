<template>
    <i :class="classes" :style="styles" v-html='svgicon'></i>
</template>
<script>
  const prefixCls = 'vui-icon';
  import Icons from '../../../../core/svg'
  export default {
    name: 'icon',
    data () {
      return {
        svgicon: '',
      }
    },
    props: {
      type: {
        type: String
      },
      size: {
        type: [Number, String],
        default: 12
      },
      color: String
    },
    computed: {
      classes () {
        let type = this.type;
        this.svgicon = Icons[type];
        return `${prefixCls} ${prefixCls}-${type}`;
      },
      styles () {
        let style = {};
        if (this.size) {
          style['height'] = `${this.size}px`;
          style['width'] = `${this.size}px`;
        }

        if (this.color) {
          style.fill = this.color;
        }
        return style;
      }
    },
  };
</script>

<style>

</style>
