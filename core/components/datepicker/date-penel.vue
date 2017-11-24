<template>
    <div class="vui-date-penel">
        <table>
            <thead>
            <tr>
                <th v-for="(head,index) in tableHead" :key="index">{{head}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(months,index) in data.days" :key="index">

                <td :class="{ 'current':item.current, 'verboten':future && nowDay > item.showDate  && currMonth >= item.month && currYear >= item.year}"
                    v-for="(item,index) in months"
                    :key="index">
                    <div @click="datepenelChange(item)" v-if="item.currentMonth"
                         :class="{'active':item.choose}">
                        {{item.showDate}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
  const initData = new Date();  //初始化时间
  export default {
    name: "vui-date-penel",
    data () {//数据
      return {
        currYear: "",
        currMonth: "",
        currDay: "",
        data: {}
      }
    },
    props: {
      nowYear: {
        type: [String, Number],
        //default: initData.getFullYear()
      },
      nowMonth: {
        type: [String, Number],
        // default: initData.getMonth() + 1
      },
      nowDay: {
        type: [String, Number],
        //  default: initData.getDate()
      },
      future: { //是否只能选择将来时间
        type: Boolean
        // default: false
      }
    },
    computed: {
//      monthData(){
//        console.log(this.nowMonth)
//        return this.getMonthData(this.nowYear, this.nowMonth, this.nowDay);
//      },
      tableHead() {

        this.getMonthData(this.nowYear, this.nowMonth, this.nowDay);
        return ["一", "二", "三", "四", "五", "六", "日"];
      }
    },
    methods: {
      getMonthData(year, month, startDay) {

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
            choose: startDay === showDate  //选中的
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

      //
      datepenelChange(day){
        let that = this;

        //防止点击非本月数据(day.currentMonth)
        if (!day.currentMonth || (that.future && that.nowDay > day.showDate && day.month <= that.currMonth && day.year <= that.currYear)) return;
        that.data.days.forEach(key => {
          key.forEach(day => {
            day.choose = false;
          });

        });
        day.choose = true;
        this.$emit("datepenelChange", day.showDate);
      },

    },
    //先复制初始化值
    created(){
      this.currYear = this.nowYear;
      this.currMonth = this.nowMonth;
      this.currDay = this.nowDay;
    },
  }
</script>

