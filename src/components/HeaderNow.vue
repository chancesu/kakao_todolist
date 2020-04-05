<template>
  <div class="today-wrap">
    <div class="today-content">
      <p class="day-content">
        <span class="sub-title">{{dayWords[this.dayIndex]}}</span>
        {{this.week[this.dayIndex]}}요일
      </p>
      <p class="today">
        {{this.setDate.y}}/{{this.setDate.m}}/<span class="date">{{this.setDate.d}}</span>
      </p>
      <img :src="require(`@/assets/img/${dayImages[this.dayIndex]}`)" class="today-img">
    </div>
    <div class="sort-option">
      <button type="button" class="btn btn-list-sort"  @click="(e) => onSortOption('progress')">진행중 할일보기</button>
      <button type="button" class="btn btn-list-sort"  @click="(e) => onSortOption('complete')">완료된 할일보기</button>
      <!-- <button type="button" class="btn btn-list-sort"  @click="(e) => onSortOption('category')">범주별 할일보기</button> -->
    </div>
    <router-link to="/setting" class="btn btn-setting">설정</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "HeaderNow",
  data() {
    return {
      week : ['일','월','화','수','목','금','토'],
      dayIndex : 0,
      nowDate: new Date(),
      setDate: {
        y : "",
        m : "",
        d : ""
      }
    };
  },
  computed: {
    ...todoModule.mapGetters(["dayWords","dayImages","listType"])
  },
  created() {
    const d = this.nowDate.getMonth() + 1;
    this.setDate.y = this.nowDate.getFullYear()
    this.setDate.m = (d < 10)?'0'+d : d
    this.setDate.d = (this.nowDate.getDate() < 10)? '0'+this.nowDate.getDate() : this.nowDate.getDate()
    this.dayIndex = this.nowDate.getDay();
  },
  methods: {
    ...todoModule.mapActions(["modifySort"]),
    onSortOption(type){
      this.modifySort(type);
      this.$nextTick(() => {
        alert('리스트 옵션이 변경되었습니다.');
        (this.$router.app._route.name !== 'Home')? this.$router.push('/'):null;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .today-wrap{
    width:90%;
    margin:0 auto;
    .today-content{
      position:relative;
      color:$theme_main_color2;
      .day-content{
        position:absolute;
        top:-20%;
        left:0;
        font-size:20px;
        .sub-title{
          display:block;
          font-size:12px;
          line-height:20px;
        }
      }
      .today{
        margin-top:26px;
        font-family:$number-font;
        font-weight:bold;
        font-size:6vw;
        letter-spacing:-1px;
        .date{
          font-size:10vw;
          padding-left:5px;
        }
      }
      .today-img{
        position:absolute;
        top:-20%;
        right:0;
        width:22%;
        height:auto;
        max-width:111px;
        min-width:58px;
      }
    }
    .sort-option{
      text-align:right;
      .btn{
        background:0;
        border:0;
        padding:0 10px;
        color:$theme_main_color;
      }
    }
    .btn-setting{
      position:absolute;
      right:10px;
      top:10px;
      font-size:12px;
      color:#fff;
    }
  }

  @media (max-width: 485px) {
    .today-wrap .today-content{
      .today{
        font-size:20px;
        .date{
          font-size:36px;
        }
      }
      .today-img{
        top:-40%;
        width:70px;
      }
      .day-content{
        top:-40%;
        font-size:12px;
      }
    }
  }
  @media (min-width: 650px) {
    .today-wrap .today-content .today{
      font-size:40px;
     .date{
      font-size:66px;
     }
    }
  }
</style>
