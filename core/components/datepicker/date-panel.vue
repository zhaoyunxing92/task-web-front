<template>
    <div :class="datePanelClassName">
        <!--头部-->
        <div :class="headerClassName">
            <!--上月-->
            <a href="javascript:void(0);" :class="prevBtnClassName" @click="toggleMonth(-1)">&lt;</a>
            <!--下月-->
            <a href="javascript:void(0);" :class="nextBtnClassName" @click="toggleMonth(1)">&gt;</a>
            <!--当前月份-->
            <span class="header-curr-month">2017年11月20号 周二</span>

        </div>
        <div :class="bodyClassName">
            <table>
                <thead>
                <tr>
                    <th v-for="(head,index) in tableHead" :key="index">{{head}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(months,index) in data.days" :key="index">
                    <td :class="item.current?'current':''" v-for="(item,index) in months">
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

</template>
<script>
  const prefixCls = 'vui-datapicker-panel';
  const initData = new Date();
  export default {
    name: "vui-data-panel",
    data () {//数据
      return {

        datePanelClassName: `${prefixCls}`,
        headerClassName: `${prefixCls}-header`,   //头部
        currMonthClass: `${prefixCls}-curr-month`,
        bodyClassName: `${prefixCls}-body`, //实体
        prevBtnClassName: `${prefixCls}-btn ${prefixCls}-prev-btn`,//上个月class name
        nextBtnClassName: `${prefixCls}-btn ${prefixCls}-next-btn`, //下个月class name
        chooseYear: '',
        chooseMonth: '',
        data: []
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
    },
    computed: {
      //表格头部名称
      tableHead(){
        return ["一", "二", "三", "四", "五", "六", "日"];
      }
    },
    methods: {
      getMonthData(year, month){
        console.log(year, month);
        let monts = [],
          monthData = [];

        if (month <= 0 || month > 12) {
          month = new Date().getMonth() + 1;
        }
        if (year <= 1900 || year >= 10000) {
          year = new Date().getFullYear();
        }
        //本月的第一天 ,周几
        let firstDay = new Date(year, month - 1, 1),

          firstDayWeekDay = firstDay.getDay();
        // debugger;
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;//0=周日
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
            month: thisMonth,
            weekDay: i % 7 + 1,
            showDate: showDate,
            currentMonth: thisMonth === month,
            current: currentDate === showDate && thisMonth === currentMonth, //真实的天
            //currentYear: currentYear === year,
            choose: currentDate === showDate//选中的
          });
        }
        for (let j = 0, len = monthData.length; j < len; j += 7) {
          monts.push(monthData.slice(j, j + 7));
        }
        this.chooseYear = year;
        this.chooseMonth = month;
        this.data = {
          year: year,
          month: month,
          days: monts
        };
      },
      //选择天
      chooseDay(item){
        // alert(item.currentDay)
        let that = this;
        if (!item.currentMonth) return;
        that.data.days.forEach(key => {
          key.forEach(day => {
            day.choose = false;
          });
        });
        item.choose = true;
        console.log(that.data);
      },
      // 切换月份
      toggleMonth(index){
        let that = this;
        let month = that.chooseMonth + index;
        that.getMonthData(that.startYear, month);

        console.log(that.data)
      }
    },
    mounted(){
      this.getMonthData(2017, 10);
    },
    watch: {
      //一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个属性。
    },
  }
</script>

