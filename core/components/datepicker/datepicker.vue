<template>
    <div :class="classes">
        <div class="vui-datapicker">
            <div class="vui-datapicker-panel-header">
                <!--上月-->
                <a href="javascript:void(0);" class="vui-datapicker-panel-btn vui-datapicker-panel-prev-btn"
                   @click="toggleMonth(-1)">&lt;</a>
                <!--下月-->
                <a href="javascript:void(0);" class="vui-datapicker-panel-btn vui-datapicker-panel-next-btn"
                   @click="toggleMonth(1)">&gt;</a>
                <!--当前月份-->
                <span class="header-curr-month">{{chooseYear}}年{{chooseMonth}}月</span>
            </div>
            <div class="vui-datapicker-panel-body">
                <table>
                    <thead>
                    <tr>
                        <th v-for="(head,index) in tableHead" :key="index">{{head}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(months,index) in data.days" :key="index">
                        <td :class="{ 'current':item.current, 'verboten':future && nowDay > item.showDate && nowYear >= item.year && nowMonth >= item.month}"
                            v-for="(item,index) in months"
                            :key="index">
                            <div @click="chooseDay(item)" v-if="item.currentMonth"
                                 :class="item.choose?'active':''">
                                {{item.showDate}}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>
<script>
  const prefixCls = 'vui vui-modal';
  const initData = new Date();  //初始化时间
  export default {
    name: "datepicker",
    data () {//数据
      return {
        nowYear: initData.getFullYear(),
        nowMonth: initData.getMonth() + 1,
        nowDay: initData.getDate(),
        chooseYear: "",
        chooseMonth: "",
        data: {},
      }
    },
    props: {
      startYear: {
        type: [String, Number],
        default: initData.getFullYear()
      },
      startMonth: {
        type: [String, Number],
        default: initData.getMonth() + 1
      },
      future: { //是否只能选择将来时间
        type: Boolean,
        default: false
      }
    },
    computed: {
      tableHead() {
        this.getMonthData(this.startYear, this.startMonth);
        return ["一", "二", "三", "四", "五", "六", "日"];
      },
      classes() {
        return `${prefixCls}`;
      }
    },
    methods: {
      getMonthData(year, month) {
        this.chooseYear = year;
        this.chooseMonth = month;

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
            weekDay: i % 7 + 1, //星期
            showDate: showDate,
            currentMonth: thisMonth === month,
            current: currentDate === showDate && thisMonth === currentMonth, //真实的天
            choose: currentDate === showDate  //选中的
          });
        }
        for (let j = 0, len = monthData.length; j < len; j += 7) {
          monts.push(monthData.slice(j, j + 7));
        }

        this.data = {
          year: year,
          month: month,
          days: monts
        };
      },
      //选择天 selectData
      chooseDay(item) {
        let that = this;

        //防止点击非本月数据(item.currentMonth)
        if (!item.currentMonth || (that.future && that.nowDay > item.showDate && that.chooseMonth <= that.nowMonth && that.chooseYear <= that.nowYear)) return;
        that.data.days.forEach(key => {
          key.forEach(day => {
            day.choose = false;
          });

        });
        item.choose = true;
        this.$emit("select", item)
      },
      // 切换月份
      toggleMonth(index) {
        let that = this;
        if (index < 0 && that.future && that.nowMonth > that.chooseMonth + index && that.chooseYear <= that.nowYear) return;

        let month = that.chooseMonth += index;
        let year = that.chooseYear;
        if (month <= 0) {
          month += 12;
          year += index;
        } else if (month > 12) {
          month = index;
          year += index;
        }
        that.getMonthData(year, month);
      }
    }
  }
</script>
