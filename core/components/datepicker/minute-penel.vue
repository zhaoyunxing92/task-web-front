<template>
    <div class="hours-minute-table">
        <table class="minute-table">
            <tr v-for="(minute,index) in minutes" :key="index">
                <td @click="minutePenelChange(item)"
                    :class="{'verboten':future&&item<=nowMinute+offest&&nowDay[0]<=nowDay[1] &&nowMonth[0]<=nowMonth[1] &&nowYear[0]<=nowYear[1]}"
                    v-for="(item,index) in minute" :key="index">
                    <div :class="{'current':item==nowMinute}">{{item}}</div>
                </td>
            </tr>
        </table>
        <div @click="goBack(nowMinute)" class="go-back">
            <span>返回</span>
        </div>
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
        ],
        offest: 3//当前时间偏移5分钟
      }
    },
    props: {
      nowHour: Array,
      nowYear: Array,
      nowMonth: Array,
      nowDay: Array,
      nowMinute: [String, Number],
      future: Boolean //是否只能选择将来时间
    },

    methods: {
      //选择分钟
      minutePenelChange(minute){
        if (minute < this.nowMinute + this.offest && this.future && this.nowDay[0] <= this.nowDay[1] && this.nowMonth[0] <= this.nowMonth[1] && this.nowYear[0] <= this.nowYear[1]) return;
        this.$emit("minuteChange", minute);
      },
      //返回
      goBack(minute)
      {
        this.$emit("minuteChange", minute);
      }
    }
  }
</script>

