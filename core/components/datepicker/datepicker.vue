<template>
    <div :class="classes" v-if="open">
        <div class="vui-datapicker">
            <!--头部-->
            <div class="vui-datapicker-panel-header">

                <!--上月-->
                <div v-if="!showTimepenel" @click="btnChangeMonth(-1)"
                     class="vui-datapicker-panel-btn vui-datapicker-panel-prev-btn">
                    <icon rotation="90" color="#fff" type="prev"/>
                </div>

                <!--下月-->
                <div v-if="!showTimepenel" @click="btnChangeMonth(1)"
                     class="vui-datapicker-panel-btn vui-datapicker-panel-next-btn">
                    <icon rotation="270" color="#fff" type="prev"/>
                </div>


                <!--当前月份-->
                <span class="header-curr-month">{{year}}年{{month | numberFormat }}月{{day | numberFormat}}</span>
            </div>
            <!--body-->
            <div class="vui-datapicker-panel-body">

                <datepenel v-if="!showTimepenel"
                           ref="datepenel"
                           :nowYear="nowYear"
                           :nowMonth="nowMonth"
                           :nowDay="nowDay"
                           :future="future"
                           :data="data"
                           @datepenelChange="changeDate">
                </datepenel>

                <timepenel v-if="showTimepenel"
                           ref="timepenel"
                           @timePenelChange="changeTime"
                           :nowHour="[hour,nowHour]"
                           :nowMinute="[minute,nowMinute]"
                           :nowMonth="[month,nowMonth]"
                           :nowDay="[day,nowDay]"
                           :nowYear="[year,nowYear]"
                           :future="future">
                </timepenel>
            </div>

            <!--底部-->
            <div class="vui-datapicker-foot">
                <span @click="showTimepenel=!showTimepenel" class="foot-time-icon" v-if="time">
                    <icon type="time" size="20"></icon>
                </span>
                <span class="curr-time" v-if="time">{{hour | numberFormat }}:{{minute | numberFormat }}</span>
                <span class="foot-btn foot-sure-btn">确定</span>
                <span class="foot-btn foot-undo-btn">取消</span>
                <!--<span class="foot-btn foot-reset-btn" @click="resetDate">重置</span>-->
                <span class="foot-btn foot-undo-btn" v-if="showTimepenel"
                      @click="showTimepenel = !showTimepenel">返回</span>
            </div>
        </div>

    </div>
</template>
<script>
  const prefixCls = 'vui vui-modal';
  const initData = new Date();  //初始化时间
  //import icon from '../icon';
  import datepenel from './date-penel';
  import timepenel from './time-panel';
  export default {
    name: "datepicker",
    data () {//数据
      return {
        classes: `${prefixCls}`,
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        data: [],
        showTimepenel: false
      }
    },
    components: {datepenel, timepenel},
    props: {
      open: { //是否显示
        type: Boolean,
        default: true
      },
      nowYear: {
        type: [String, Number],
        default: initData.getFullYear()
      },
      nowMonth: {
        type: [String, Number],
        default: initData.getMonth() + 1
      },
      nowDay: {
        type: [String, Number],
        default: initData.getDate()
      },
      nowHour: {
        type: [String, Number],
        default: initData.getHours()
      },
      nowMinute: {
        type: [String, Number],
        default: initData.getMinutes()
      },
      future: { //是否只能选择将来时间
        type: Boolean,
        default: false
      },
      time: { //是否显示选择时间
        type: Boolean,
        default: false
      }
    },

    //数据先复制一份
    created(){
      this.year = this.nowYear;
      this.day = this.nowDay;
      this.month = this.nowMonth;
      this.hour = this.nowHour;
      this.minute = this.nowMinute;

      this.getMonthData(this.year, this.month, this.day)
    },
    methods: {
      // 切换月份
      btnChangeMonth(index) {
        let that = this;
        let currMonth = that.month + index;

        if (index < 0 && that.future && currMonth < that.nowMonth && that.year <= that.nowYear) return;
        //月份切换后再切换过来  day需要判断
        if (index < 0 && that.future && that.day < that.nowDay && currMonth <= that.nowMonth && that.year <= that.nowYear) that.day = that.nowDay;
        if (currMonth === 0) { //上年
          that.month = 12;
          that.year += index;
        } else if (currMonth > 12) {//下年
          that.month = index;
          that.year += index;
        } else {//本年
          that.month = currMonth;
        }
        this.getMonthData(that.year, that.month, that.day);

      },
      //改变天
      changeDate(day){
        //选择当前天时间需要回滚
        let that = this;
        if (that.nowDay === day && that.month === that.nowMonth && that.year === that.nowYear) {
          that.hour = that.nowHour;
          that.minute = that.nowMinute;
        }
        that.day = day;
      },
      //修改时间
      changeTime(date){
        //console.log(date);
        this.hour = date.hour;
        this.minute = date.minute;
        this.year = date.year;
        this.month = date.month;
        this.day = date.day;

        this.getMonthData(this.year, this.month, this.day);
      },
      getMonthData(year, month, startDay) {
        //if (startDay === this.day && month === this.month && year === this.year)return;
        let monts = [],
          monthData = [];
        //本月的第一天 ,周几
        let firstDay = new Date(year, month - 1, 1),
          firstDayWeekDay = firstDay.getDay();
        // debugger;
        if (firstDayWeekDay === 0) firstDayWeekDay = 7; //0=周日
        //上月最后一天
        let lastDayOfLastMonth = new Date(year, month - 1, 0),
          lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        //显示几个上月数据,周一就不需要显示，周日显示六个
        let preMonthDayCount = firstDayWeekDay - 1;
        //本月最后一天
        let lastDay = new Date(year, month, 0),
          lastDate = lastDay.getDate();

        for (let i = 0; i < 7 * 6; i++) {
          // 要显示几个上月数据
          let date = i + 1 - preMonthDayCount,
            showDate = date,
            thisMonth = month;
          if (date <= 0) {
            // <=0 上个月
            thisMonth = month - 1;
            showDate = lastDateOfLastMonth + date;
          } else if (date > lastDate) {
            thisMonth = month + 1;
            showDate = showDate - lastDate;
          }

          if (thisMonth === 0) thisMonth = 12;
          if (thisMonth === 13) thisMonth = 1;

          let currentDay = new Date(),
            currentMonth = currentDay.getMonth() + 1,
            currentDate = currentDay.getDate();
          //存放数据
          monthData.push({
            year: year,
            month: month,    //月份
            //  weekDay: i % 7 + 1, //星期
            showDate: showDate,
            currentMonth: thisMonth === month,
            current: currentDate === showDate && thisMonth === currentMonth, //真实的天
            choose: startDay === showDate  //选中的
          });
        }
        for (let j = 0, len = monthData.length; j < len; j += 7) {
          monts.push(monthData.slice(j, j + 7));
        }

        this.data = monts;

//        this.data = {
//          year: year,
//          month: month,
//          days: monts
//        };
      },
    },
    filters: {
      //时间格式化，1=01
      numberFormat: function (value) {
        if (value.length >= 2) return value;
        if (value < 10) {
          return '0' + value
        }
        return value
      }
    }
  }
</script>
