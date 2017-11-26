<template>
    <div>
        <div class="vui-time-penel" v-if=" !showHourPenel && !showMinutePenel">
            <!--小时-->
            <div class="vui-hour">

                <ul>
                    <li @click="toggleHour(-1)" class="vui-time-penel-btn">
                        <icon class="prev-btn" size="30" rotation="180" type="prev"/>
                    </li>
                    <li @click="openHourPenel" class="vui-time-penel-btn">
                        <span class="curr-time">{{hour | numberFormat}}</span>
                    </li>
                    <li @click="toggleHour(1)" class="vui-time-penel-btn">
                        <icon class="next-btn" type="prev" size="30"/>
                    </li>
                </ul>
            </div>
            <!--分钟-->
            <div class="vui-minute">
                <ul>
                    <li @click="toggleMinute(-1)" class="vui-time-penel-btn">
                        <icon class="prev-btn" size="30" rotation="180" type="prev"/>
                    </li>
                    <li @click="openMinutePenel" class="vui-time-penel-btn">
                        <span class="curr-time">{{minute  | numberFormat}}</span>
                    </li>
                    <li @click="toggleMinute(1)" class="vui-time-penel-btn">
                        <icon class="next-btn" type="prev" size="30"/>
                    </li>
                </ul>
            </div>


        </div>
        <!--小时面板-->
        <hourpenel v-if="showHourPenel" :nowHour="hour | numberFormat" :future="future"
                   @hourChange="hourChange"></hourpenel>
        <!--分钟面板-->
        <minutepenel v-if="showMinutePenel" :nowMinute="minute" :future="future"
                     @minuteChange="minuteChange"></minutepenel>
    </div>

</template>
<script>
  import hourpenel from './hour-penel';//时间
  import minutepenel from './minute-penel';
  export default {
    name: "vui-time-panel",
    data () {//数据
      return {
        hour: "",
        minute: "",
        showHourPenel: false,
        showMinutePenel: false
      }
    },
    components: {hourpenel, minutepenel},
    props: {
      nowMinute: {
        type: [String, Number],
        //default: 2
      },
      nowHour: {
        type: [String, Number],
        // default: initData.getDate()
      },
      future: { //是否只能选择将来时间
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      toggleHour(index){
        let currHour = this.hour + index;
        if (currHour < 0) {
          this.hour = 23
        } else if (currHour >= 24) {
          this.hour = 0
        } else {
          this.hour = currHour
        }
      },
      toggleMinute(index){
        // this.minute += index;
        let currMinute = this.minute + index;

        if (currMinute + index < 0) {
          this.minute = 59;
        } else if (currMinute >= 60) {
          this.minute = 0;
        } else {
          this.minute = currMinute;
        }
      },
      openHourPenel(){
        this.showHourPenel = !this.showHourPenel;
      },
      openMinutePenel(){
        this.showMinutePenel = !this.showMinutePenel;
      },
      //小时修改
      hourChange(hour){
        this.showHourPenel = !this.showHourPenel;
        console.log(hour);
      },
      //分钟修改
      minuteChange(minute){
        console.log(minute);
        this.showMinutePenel = !this.showMinutePenel;
      }
    },
    created(){
      this.hour = this.nowHour;
      this.minute = this.nowMinute;
    },
    filters: {
      //时间格式化，1=01
      numberFormat: function (value) {
        if (value < 10) {
          return '0' + value
        }
        return value.toString();
        // return value * (discount / 100);
      }
    }
  }
</script>

