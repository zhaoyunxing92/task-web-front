<template>
    <i :class="classes" :style="styles" v-html='svgicon'></i>
</template>
<script>
  const prefixCls = 'vui-icon';
  import Icons from '../../svg'
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
        default: 14
      },
      color: String,
      rotation: [Number, String]   //旋转
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

        if (this.rotation) {    //transform-origin: center bottom
          style['transform'] = `rotate(${this.rotation}deg)`;
          // style['transform-origin']='50%';
        }

        return style;
      }
    },
  };
</script>

<style>

</style>
