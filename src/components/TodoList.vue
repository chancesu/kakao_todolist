<template>
  <div class="todo-list">
    <h2>{{this.sortTitle}} 목록</h2>
    <p class="total-list">총 {{this.totalList.length}}개의 {{this.sortTitle}}이 있습니다.</p>
    <TodoCard
      v-for="(todo, index) in this.todoList" :key="index"
      :cardContent="todo"
      :class="(listType === 'complete')? 'card-complete': null"
    ></TodoCard>
    <p v-if="this.todoEmpty" class="list-empty">
      등록된 할일이 없습니다.
    </p>
    <div class="pagination" v-if="this.total>0">
      <span v-for="i in this.total" :key="i" @click="(e) => settingPage(i)">{{i}}</span>
    </div>
      <router-link to="/write" class="btn-submit">할일 등록하러가기</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import TodoCard from '@/components/TodoCard.vue'

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "TodoList",
  components: {
    TodoCard
  },
  data() {
    return {
      sortTitle:'진행중인 할 일',
      todoList : this.todos,
      totalList : this.todos,
      todoEmpty : false,
      total:0,
      paging : 0,
      unit : 4,
    };
  },
  computed: {
    ...todoModule.mapGetters(["todos","listType"])
  },
  watch:{
    todos(){
      this.listTypeSetting(this.listType);
      this.settingPage(this.paging);
    },
    listType(){
      this.listTypeSetting(this.listType);
    }
  },
  created(){
    (this.todos.length>0)? this.todoEmpty = false : this.todoEmpty = true;
    this.listTypeSetting(this.listType);
  },
  methods :{
    listTypeSetting(type){
      if(type == 'progress'){
        this.totalList = this.todos.filter(t=> !t.complete);
      }else if(type == 'complete'){
        this.totalList = this.todos.filter(t=> t.complete);
      }else if(type == 'category'){
        this.totalList = this.todos.filter(t=> t.category === 'category');
      }
      this.paging = 1;
      this.listTitleSetting();
      this.settingPage(this.paging);
    },
    listTitleSetting(){
      switch(this.listType){
        case 'progress':
          this.sortTitle = '진행 중인 할 일';
        break;
        case 'complete':
          this.sortTitle = '완료된 할 일';
        break;
        case 'category':
          this.sortTitle = '분류별 할 일';
        break;
      }
    },
    settingPage(now){
      this.paging = now;
      if(this.totalList.length > this.unit){
        this.todoList = this.totalList.slice((this.paging-1)*this.unit, this.paging*this.unit);
      }else{
        this.todoList = this.totalList;
      }
        this.total = Math.ceil(this.totalList.length/this.unit);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  $assets: '~@/assets/img';
  h2{
    color:$theme_text2;
    font-size:14px;
    margin-bottom:10px;
  }
  .total-list{
    font-size:12px;
    color:$theme_text3;
  }
  .list-empty{
    margin-top:20px;
    padding-top:120px;
    background: url( $assets + '/notice.png') no-repeat 50% 0;
    color:$theme_text3;
    text-align:center;
  }
  .btn-submit{
    display:block;
    width:80%;
    margin:20px auto;
    padding:10px;
    background:$theme_main_bg;
    border-radius:10px;
    box-shadow:2px 2px 5px rgba(0,0,0,.3);
    color:$theme_main_color;
    font-size:16px;
    text-align:center;
  }
  .pagination{
    width:100%;
    text-align:center;
    >span{
      display:inline-block;
      width:20px;
      height:20px;
      background:#fff;
      border:1px solid #ddd;
      font-size:12px;
      line-height:24px;
    }
  }
</style>
