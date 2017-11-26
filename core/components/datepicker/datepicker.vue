<template>
    <div :class="classes" v-if="open">
        <div class="vui-datapicker">
            <!--头部-->
            <div class="vui-datapicker-panel-header">

                <!--上月-->
                <div @click="btnChangeMonth(-1)" class="vui-datapicker-panel-btn vui-datapicker-panel-prev-btn">
                    <icon rotation="90" color="#fff" type="prev"/>
                </div>

                <!--下月-->
                <div @click="btnChangeMonth(1)" class="vui-datapicker-panel-btn vui-datapicker-panel-next-btn">
                    <icon rotation="270" color="#fff" type="prev"/>
                </div>

                <!--当前月份-->
                <span class="header-curr-month">{{year}}年{{month | numberFormat }}月{{day | numberFormat}}号</span>
            </div>
            <!--body-->
            <div class="vui-datapicker-panel-body">

                <datepenel v-if="false" ref="datepenel" :nowYear="year" :nowMonth="month" :nowDay="nowDay"
                           :future="futureDate"
                           @datepenelChange="changeDate"></datepenel>

                <timepenel  ref="timepenel" @timePenelChange="changeTime" :nowHour="hour"
                           :nowMinute="minute" :future="futureDate"></timepenel>
            </div>
            <!--底部-->
            <div class="vui-datapicker-foot">
                <span class="foot-time-icon" v-if="showTime">
                    <icon type="time" size="20"></icon>
                    <span class=" foot-undo-btn">{{hour | numberFormat }}:{{minute | numberFormat }}</span>
                </span>

                <span class="foot-btn foot-sure-btn">确定</span>
                <span class="foot-btn foot-undo-btn">取消</span>
                <span class="foot-btn foot-reset-btn" @click="resetDate">重置</span>
                <span class="foot-btn foot-undo-btn" v-if="showTime">返回</span>
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
        year: "",
        month: "",
        day: "",
        showDay: '',
        futureDate: false,
        hour: initData.getHours(),
        minute: initData.getMinutes(),
        time: ""
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
      future: { //是否只能选择将来时间
        type: Boolean,
        default: true
      },
      showTime: { //是否显示选择时间
        type: Boolean,
        default: true
      }
    },

    //数据先复制一份
    created(){
      this.year = this.nowYear;
      this.day = this.nowDay;
      this.month = this.nowMonth;
      this.futureDate = this.future;
      // this.resetDate();

    },
    methods: {
      // 切换月份
      btnChangeMonth(index) {
        let that = this;
        let currMonth = that.month + index;
        console.log(that.year <= that.nowYear)
        if (index < 0 && that.future && currMonth < that.nowMonth && that.year <= that.nowYear) return;

        if (currMonth === 0) { //上年
          that.month = 12;
          that.year += index;
        } else if (currMonth > 12) {//下年
          that.month = index;
          that.year += index;
        } else {//本年
          that.month = currMonth;
        }

      },
      //改变天
      changeDate(day){
        this.day = day;
      },
      //修改时间
      changeTime(){
        console.log("时间改变");
      },
      resetTime(){

      },
      //重置
      resetDate(){
        this.day = this.nowDay;
        this.month = this.nowMonth;
        this.year = this.nowYear;
        this.$refs.datepenel.getMonthData(this.nowYear, this.nowMonth, this.nowDay);

      }
    },
    filters: {
      //时间格式化，1=01
      numberFormat: function (value) {
        if (value < 10) {
          return '0' + value
        }
        return value
        // return value * (discount / 100);
      }
    }
  }
</script>
