<template>
    <div class="hours-minute-table">
        <table class="minute-table">
            <tr v-for="(minute,index) in minutes" :key="index">
                <td @click="minutePenelChange(item)" :class="{'verboten':future&&item<nowMinute+5}"
                    v-for="(item,index) in minute" :key="index">
                    <div :class="{'current':item===nowMinute}">{{item}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
  export default {
    name: "vui-minute-penel",
    data () {//数据
      return {
        minutes: [
          ['00', '05', '10', '15'],
          ['20', '25', '30', '35'],
          ['40', '45', '50', '55']
        ]
      }
    },
    props: {
      nowMinute: [String, Number],
      future: Boolean //是否只能选择将来时间
    },

    methods: {
      minutePenelChange(minute){
        if (minute < this.nowMinute+5 && this.future) return;
        this.$emit("minuteChange", minute);
      }
    }
  }
</script>

