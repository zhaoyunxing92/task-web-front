<template>
    <div class="vui-date-penel">
        <table class="date-table-penel">
            <thead>
            <tr>
                <th v-for="(head,index) in tableHead" :key="index">{{head}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(months,index) in data" :key="index">

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
  //const initData = new Date();  //初始化时间
  export default {
    name: "vui-date-penel",
    data () {//数据
      return {
        currYear: "",
        currMonth: "",
        currDay: ''
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
      },
      data: Array
    },
    computed: {
//      monthData(){
//        console.log(this.nowMonth)
//        return this.getMonthData(this.nowYear, this.nowMonth, this.nowDay);
//      },
      tableHead() {
        return ["一", "二", "三", "四", "五", "六", "日"];
      }
    },
    methods: {


      //
      datepenelChange(day){
        let that = this;

        //防止点击非本月数据(day.currentMonth)
        if (!day.currentMonth || (that.future && that.nowDay > day.showDate && day.month <= that.currMonth && day.year <= that.currYear)) return;
        that.data.forEach(key => {
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
      //this.getMonthData(this.nowYear, this.nowMonth, this.nowDay);
    },
  }
</script>

