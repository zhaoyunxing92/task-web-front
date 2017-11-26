<template>
    <div class="hours-minute-table">
        <table class="hours-table">
            <tr v-for="(hour,index) in hours" :key="index">
                <td @click="hourPenelChange(item)" :class="{'verboten':future&&item<nowHour}"
                    v-for="(item,index) in hour" :key="index">
                    <div :class="{'current':item===nowHour}">{{item}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
  export default {
    name: "vui-hour-penel",
    data () {//数据
      return {
        hours: [
          ['00', '01', '02', '03', '04', '05'],
          ['06', '07', '08', '09', '10', '11'],
          ['12', '13', '14', '15', '16', '17'],
          ['18', '19', '20', '21', '22', '23']
        ]
      }
    },
    props: {
      nowHour: [String, Number],
      future: Boolean //是否只能选择将来时间
    },
    methods: {
      hourPenelChange(hour){
        if (hour < this.nowHour && this.future) return;
        this.$emit("hourChange", hour);
      }
    }
  }
</script>

