<template>
  <div class="todo-card"
    :class="(this.cardContent.category)? this.cardContent.category[1] : null"
    @click="(e) => onViewTodo(e,this.cardContent)"
    >
    <div class="todo-top">
      <input type="checkbox" :id="cardContent.id" @change="TodoComplete" v-model="cardContent.complete" class="btn">
      <label :for="cardContent.id" class="todo-title">{{cardContent.title}}</label>
      <p class="todo-content">{{cardContent.content}}</p>
    </div>
    <div class="todo-bottom">
      <span class="creat-time">생성시간 : {{cardContent.creat_at}}</span>
      <span
      v-for="(refer, index) in this.cardContent.refer"
      :key="index"
      class="refer-title"
      :class="{'test':refer.state}"
      >{{refer.title}}</span>
    </div>
    <button type="button" class="btn btn-delete" @click="(e) => onDeleteTodo(this.cardContent)">삭제</button>
    <button type="button" class="btn btn-modify" @click="(e) => onModifyTodo(this.cardContent)">수정</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "TodoCard",
  props:{
    cardContent : Object
  },
  data() {
    return {
      refer_todo : []
    };
  },
  computed: {
    ...todoModule.mapGetters(["todos"])
  },
  created() {
  },
  methods: {
    ...todoModule.mapActions(["removeTodo","completeTodo"]),
    onDeleteTodo(todo){
      const referCheck = this.todos;
      referCheck.map(t=>{
        let refer = t.refer.filter(r=> r.key !== todo.uuid);
        t.refer = refer;
        return t;
      });
      this.removeTodo(referCheck);
    },
    TodoComplete(e){
      const referCheck = this.cardContent.refer.find(r=>{
        let refer = this.todos.filter(e=> e.uuid === r.key);
        return !refer[0].complete;
      });
      if(!referCheck){
        this.completeTodo(this.cardContent);
        this.$nextTick(() => {
          alert('할일이 완료 되었습니다.');
        });
        e.target.checked = false;
      }else{
        alert("참조한 할일에 완료되지 않은 항목이 있습니다.");
        this.cardContent.complete = false;
        e.target.checked = false;
      }
    },
    onViewTodo(e,todo){
      if(!e.target.classList.contains('btn')){
        this.$router.push(`/view?key=${todo.uuid}`);
      }
    },
    onModifyTodo(todo){
      this.$router.push(`/write?key=${todo.uuid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .todo-card{
    overflow:hidden;
    position:relative;
    margin:10px auto;
    background:#fff;
    border:1px solid #ddd;
    border-radius:10px;
    &.card-complete{
      background:#bbb;
      .todo-top input[type="checkbox"]{
        visibility:hidden;
      }
    }
    &:before{
      content:"";
      position:absolute;
      top:0;
      bottom:0;
      left:-2px;
      display:block;
      width:15px;
    }
    &.color1:before{
      background: $color1;
    }
    &.color2:before{
      background: $color2;
    }
    &.color3:before{
      background: $color3;
    }
    &.color4:before{
      background: $color4;
    }
    &.color5:before{
      background: $color5;
    }
    &.color6:before{
      background: $color6;
    }
    &.color7:before{
      background: $color7;
    }
    &.color8:before{
      background: $color8;
    }
    .todo-top{
      padding:20px;
      border-bottom:1px dashed #ddd;
      input[type="checkbox"]{
        width:16px;
        height:16px;
        margin-right:10px;
        & + label.todo-title{
          display:inline-block;
          overflow:hidden;
          width:calc(100% - 50px);
          height:20px;
          color:$theme_text;
          font-size:18px;
          font-weight:bold;
          line-height:20px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .todo-content{
        overflow:hidden;
        width:calc(100% - 50px);
        height:20px;
        margin-left:28px;
        color:$theme_text2;
        font-size:14px;
        line-height:20px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .todo-bottom{
      min-height:20px;
      padding:10px 20px;
      .creat-time{
        display:inline-block;
        padding:2px 5px;
        color:$theme_text3;
        font-size:12px;
        vertical-align:top;
      }
      .refer-title{
        overflow:hidden;
        display:inline-block;
        max-width:calc(32% - 20px);
        margin-left:3px;
        padding:2px 5px;
        color:$theme_text2;
        font-size:12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:before{
          content:"@ ";
        }
      }
    }
    .btn{
      position:relative;
    }
    .btn-delete{
      overflow:hidden;
      position:absolute;
      top:20px;
      right:20px;
      width:20px;
      height:20px;
      border-radius:50%;
      text-indent:-1000em;
      &:before{
        content:"";
        position:absolute;
        top:8px;
        left:4px;
        width:10px;
        border-top:2px solid $theme_text;
        transform: rotateZ(45deg);
      }
      &:after{
        content:"";
        position:absolute;
        top:8px;
        left:4px;
        width:10px;
        border-top:2px solid $theme_text;
        transform: rotateZ(-45deg);
      }
    }
    .btn-modify{
      overflow:hidden;
      position:absolute;
      bottom:10px;
      right:20px;
      width:30px;
      height:20px;
      padding:0px 3px;
      border-radius:3px;

    }
  }
  @media (max-width: 650px) {
    .todo-card{
      .todo-bottom{
        .creat-time{
          display:none;
        }
      }
    }
  }
</style>
