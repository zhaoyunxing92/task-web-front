<template>
    <div>
        <div class="vui-time-penel" v-if=" !showHourPenel && !showMinutePenel">
            <!--小时-->
            <div class="vui-hour">

                <ul>
                    <li :class="{'verboten':future && nowHour[1] >= date.hour && nowDay[1] >= date.day && nowMonth[1] >= date.month && nowYear[1] >= date.year}"
                        @click="toggleHour(-1)"
                        class="vui-time-penel-btn">
                        <icon class="prev-btn" size="30" rotation="180" type="prev"/>
                    </li>
                    <li @click="hourChange(-1)" class="vui-time-penel-btn">
                        <span class="curr-time">{{date.hour | numberFormat}}</span>
                    </li>
                    <li @click="toggleHour(1)" class="vui-time-penel-btn">
                        <icon class="next-btn" type="prev" size="30"/>
                    </li>
                </ul>
            </div>
            <!--分钟-->
            <div class="vui-minute">
                <ul>
                    <li :class="{'verboten':future && nowMinute[1]==date.minute && nowDay[1] >= date.day && nowMonth[1] >= date.month && nowYear[1] >= date.year}"
                        @click="toggleMinute(-1)"
                        class="vui-time-penel-btn">
                        <icon class="prev-btn" size="30" rotation="180" type="prev"/>
                    </li>
                    <li @click="minuteChange(-1)" class="vui-time-penel-btn">
                        <span class="curr-time">{{date.minute  | numberFormat}}</span>
                    </li>
                    <li @click="toggleMinute(1)" class="vui-time-penel-btn">
                        <icon class="next-btn" type="prev" size="30"/>
                    </li>
                </ul>
            </div>
        </div>
        <!--小时面板-->
        <hourpenel v-if="showHourPenel"
                   :nowHour="nowHour[1] | numberFormat"
                   :future="future"
                   @hourChange="hourChange"
                   :nowMonth="[date.month,nowMonth[1]]"
                   :nowDay="[date.day,nowDay[1]]"
                   :nowYear="[date.year,nowYear[1]]">
        </hourpenel>
        <!--分钟面板-->
        <minutepenel v-if="showMinutePenel"
                     :nowMinute="nowMinute[1]"
                     :future="future"
                     @minuteChange="minuteChange"
                     :nowMonth="[date.month,nowMonth[1]]"
                     :nowDay="[date.day,nowDay[1]]"
                     :nowYear="[date.year,nowYear[1]]">
        </minutepenel>

    </div>

</template>
<script>
  import hourpenel from './hour-penel';//时间
  import minutepenel from './minute-penel';
  export default {
    name: "vui-time-panel",
    data () {//数据
      return {
        date: {
          hour: 0,
          minute: 0,
          year: 0,
          day: 0,
          month: 0,
        },
        nowLastDate: '',
        lastDayOfLastMonth: '',
        showHourPenel: false,
        showMinutePenel: false
      }
    },
    components: {hourpenel, minutepenel},
    props: {
      nowMinute: Array,
      nowHour: Array,
      nowYear: Array,
      nowMonth: Array,
      nowDay: Array,
      future: Boolean //是否只能选择将来时间
    },

    methods: {//timePenelChange
      toggleHour(index){
        let that = this, currHour = parseInt(that.date.hour) + index;
        if (that.future && that.nowHour[1] > currHour && that.nowDay[1] >= that.date.day && that.nowMonth[1] >= that.date.month && that.nowYear[1] >= that.date.year) return;

        if (currHour < 0) {
          that.date.hour = 23;
          that.date.day += index;
          if (that.date.day <= 0) {
            that.date.day = that.lastDayOfLastMonth.getDate();
            that.date.month += index;
            if (that.date.month <= 0) {
              that.date.month = 12;
              that.date.year += index;
            }
          }
        } else if (currHour > 23) {
          that.date.hour = 0;
          that.date.day += index;
          if (that.date.day >= that.nowLastDate.getDate()) {
            that.date.day = 1;
            that.date.month += index;
            if (that.date.month > 12) {
              that.date.month =1;
              that.date.year += index;
            }
          }
        } else {
          that.date.hour = currHour;
        }
        console.log(JSON.stringify(this.date))
        this.$emit("timePenelChange", this.date);

      },
      toggleMinute(index){
        let that = this, currMinute = parseInt(that.date.minute) + index;
        
        if (that.future && that.nowMinute[1] > currMinute && that.nowHour[1] >= that.date.hour && that.nowDay[1] >= that.date.day && that.nowMonth[1] >= that.date.month && that.nowYear[1] >= that.date.year) return;
        
        if (currMinute < 0) {
          that.date.minute = 59;
          that.date.hour += index;
          if (that.date.hour < 0) {
            that.date.hour = 23;
            that.date.day += index;
            if (that.date.day <= 0) {
              that.date.day = that.lastDayOfLastMonth.getDate();
              that.date.month += index;
              if (that.date.month <= 0) {
                that.date.month = 12;
                that.date.year += index;
              }
            }
          }
        } else if (currMinute >= 60) {
          that.date.minute = 0;
          that.date.hour += index;
          if (that.date.hour > 23) {
            that.date.hour = 0;
            that.date.day += index;
            if (that.date.day > that.nowLastDate.getDate()) {
              that.date.day = 1;
              that.date.month += index;
              if (that.date.month > 12) {
                that.date.month = 1;
                that.date.year += index;
              }
            }
          }
        } else {
          that.date.minute = currMinute;
        }
        this.$emit("timePenelChange", this.date);
      },
      //小时修改
      hourChange(hour){
        this.showHourPenel = !this.showHourPenel;
        if (hour > -1) {
          this.date.hour = hour;
          this.$emit("timePenelChange", this.date);
        }
      },
      //分钟修改
      minuteChange(minute){
        this.showMinutePenel = !this.showMinutePenel;
        if (minute > -1) {
          this.date.minute = minute;
          this.$emit("timePenelChange", this.date);
        }
      }
    },
    created(){
      /**
       *  hour: 0,
       minute: 0,
       year: 0,
       day: 0,
       month: 0,
       */
      this.date.hour = this.nowHour[0];
      this.date.minute = this.nowMinute[0];
      this.date.year = this.nowYear[0];
      this.date.day = this.nowDay[0];
      this.date.month = this.nowMonth[0];
      this.nowLastDate = new Date(this.date.year, this.date.month + 1, -1);
      this.lastDayOfLastMonth = new Date(this.date.year, this.date.month - 1, 0);
    },
    filters: {
      //时间格式化，1=01
      numberFormat: function (value) {
        if (value.length >= 2) return value;
        if (value < 10) {
          return '0' + value
        }
        return value;
      }
    }
  }
</script>

