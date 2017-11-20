<template>
  <i :class="classes" :style="styles" v-html='svgIcons.home'></i>
</template>
<script>
  const prefixCls = 'vui-icon';
  import Icons from '../../svg'
  import oneOf from '../../utils'
  export default {
    name: 'icon',
    data () {
      return {
        svgIcons: Icons,
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
        return `${prefixCls} ${prefixCls}-${this.type}`;
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
