<template>
  <div class="todo-view">
    <ul :class="(this.viewData.category)? this.viewData.category[1] : null">
      <li>
        <strong class="label essential">제목</strong>
        <p class="view-title">{{this.viewData.title}}</p>
      </li>
      <li class="view-date">
        <p> 생성일자 : {{this.viewData.creat_at}}
        <span v-if="this.viewData.modify_at"> | 수정일자 : {{this.viewData.modify_at}}</span> </p>
      </li>
      <li class="view-content">
        <strong class="label essential">내용</strong>
        <p>{{this.viewData.content}}</p>
      </li>
      <li>
        <strong class="label">참조 할일</strong>
        <p v-if="!this.viewData.refer">참조된 할일이 없습니다.</p>
        <ul v-else class="select-refer-list">
          <li v-for="(r ,i) in this.viewData.refer" :key="i" >{{r.title}}</li>
        </ul>
      </li>
      <li>
        <strong class="label">범주</strong>
        <p v-if="this.viewData.category">{{this.viewData.category[0]}}</p>
        <p v-else>선택된 범주가 없습니다.</p>
      </li>
    </ul>
    <div class="btn-group">
      <router-link to="/" class="btn btn-home">Home</router-link>
      <button type="submit" class="btn btn-submit" @click="(e) => onModifyTodo(this.viewData)">수정</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "TodoView",
  data() {
    return {
      viewData : {}
    };
  },
  computed: {
    ...todoModule.mapGetters(["todos"])
  },
  created() {
    this.viewData = this.todos.filter(e=> e.uuid === this.$route.query.key)[0];
  },
  methods: {
    onModifyTodo(todo){
      this.$router.push(`/write?key=${todo.uuid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .todo-view{
    box-sizing:border-box;
    width:90%;
    margin:0 auto;
    >ul{
      overflow:hidden;
      position:relative;
      background:#fff;
      border:1px solid #ddd;
      border-radius:10px;
      padding:20px 0;
      >li{
        margin-top:15px;
        padding:10px 40px;
        border-top:1px dashed #ddd;
        &:first-child{
          margin-top:0;
          border-top:0;
        }
        &.view-date{
          color:$theme_text3;
          font-size:14px;
        }
        &.view-content{
          margin-top:0;
          p{
            min-height:100px;
            padding:10px 0;
            color:$theme_text2;
            font-size:14px;
            line-height:1.2;
          }
        }
        .label{
          display:block;
          margin-bottom:5px;
          color: $theme_text;
          font-size:16px;
          font-weight:normal;
          &.essential{
            &:after{
              content:"*";
              color:#f00;
            }
          }
        }
        .view-title{
          color:$theme_text;
          font-size:24px;
          font-weight:bold;
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
    }
    button{
      background:#fff;
      border:0;
    }
    .select-refer-list{
      margin:10px 24px;
      li{
        list-style:disc;
        padding-left:10px;
        font-size:14px;
        line-height:20px;
        color:$theme_text2;
        &:first-child{
          margin-top:0;
        }
        button{
          width:20px;
          height:20px;
          padding:5px;
          background:transparent;
        }
      }
    }
    .btn-group{
      text-align:center;
      .btn{
        display:inline-block;
        width:45%;
        margin-top:20px;
        padding:10px;
        border-radius:10px;
        box-shadow:2px 2px 5px rgba(0,0,0,.3);
        font-size:16px;
        text-align:center;
      }
      .btn-home{
        background:$theme_main_color;
        color:$theme_text;
      }
      .btn-submit{
        background:$theme_main_bg;
        color:$theme_main_color;
        margin-left:3%;
      }
    }
  }
</style>
