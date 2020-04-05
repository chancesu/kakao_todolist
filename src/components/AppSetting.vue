<template>
  <div class="todo-form">
    <ul>
      <li>
        <strong class="label essential">요일별 문구 수정</strong>
        일요일 : <input type="text" v-model="dayWords[0]" class="input" placeholder="일요일의 문구를 입력해주세요."/><br/>
        월요일 : <input type="text" v-model="dayWords[1]" class="input" placeholder="월요일의 문구를 입력해주세요."/><br/>
        화요일 : <input type="text" v-model="dayWords[2]" class="input" placeholder="화요일의 문구를 입력해주세요."/><br/>
        수요일 : <input type="text" v-model="dayWords[3]" class="input" placeholder="수요일의 문구를 입력해주세요."/><br/>
        목요일 : <input type="text" v-model="dayWords[4]" class="input" placeholder="목요일의 문구를 입력해주세요."/><br/>
        금요일 : <input type="text" v-model="dayWords[5]" class="input" placeholder="금요일의 문구를 입력해주세요."/><br/>
        토요일 : <input type="text" v-model="dayWords[6]" class="input" placeholder="토요일의 문구를 입력해주세요."/>
      </li>
      <li>
        <button type="submit" class="btn-submit" @click="dailyWord">문구 수정</button>
      </li>
      <li>
        <label for="category" class="label">범주 삭제</label>
        <p v-if="this.categories.length === 0">저장된 범주가 없습니다.</p>
        <ul class="select-category-list">
          <li v-for="(category, index) in this.categories" :key="index">
            <span :class="category[1]">{{category[0]}}</span> <button type="button" @click="(e) => categoryDelete(index)">X</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "AppSetting",
  computed: {
    ...todoModule.mapGetters(["dayWords","categories"])
  },
  created() {
  },
  methods: {
    ...todoModule.mapActions(["deleteCategory","modifyDayWords"]),
    categoryDelete(index){
      this.deleteCategory(index);
      this.$nextTick(() => {
        alert('범주가 삭제되었습니다.');
      });
    },
    dailyWord(){
      this.modifyDayWords(this.dayWords);
      this.$nextTick(() => {
        alert('요일별 문구가 수정되었습니다.');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .todo-form{
    width:90%;
    margin:0 auto;
    padding:20px 0;
    >ul{
      >li{
        margin-top:15px;
        &:first-child{
          margin-top:0;
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
        .input{
          box-sizing:border-box;
          width:calc(100% - 50px);
          height:40px;
          padding:5px 10px;
          border:1px solid #bfbfbf;
          border-radius:5px;
          color:$theme_text2;
          font-size:16px;
          line-height:30px;
        }
        textarea.input{
          height:60px;
          resize:none;
        }
        .option-area{
          margin-bottom:5px;
          input[type="checkbox"]{
            width:16px;
            height:16px;
            margin-right:5px;
            & + label{
              font-size:14px;
              color:$theme_text3;
            }
          }
        }
        .description{
          font-size:14px;
          color:#666;
        }
      }
    }
    button{
      background:#fff;
      border:0;
    }
    .select-category-list{
      margin:10px 24px;
      li{
        list-style:disc;
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
        >span{
          &:before{
          content:"";
          display:inline-block;
          width:10px;
          height:10px;
          margin-right:10px;
          border-radius:50%;
          }
          &.color1:before{
            background:$color1;
          }
          &.color2:before{
            background:$color2;
          }
          &.color3:before{
            background:$color3;
          }
          &.color4:before{
            background:$color4;
          }
          &.color5:before{
            background:$color5;
          }
          &.color6:before{
            background:$color6;
          }
          &.color7:before{
            background:$color7;
          }
          &.color8:before{
            background:$color8;
          }
        }
      }
    }
    .btn-submit{
      width:100%;
      margin-top:20px;
      padding:10px;
      background:$theme_main_bg;
      border-radius:10px;
      box-shadow:2px 2px 5px rgba(0,0,0,.3);
      color:$theme_main_color;
      font-size:16px;
      text-align:center;
    }
  }
</style>
