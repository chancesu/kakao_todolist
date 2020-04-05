<template>
  <div class="todo-form">
    <ul>
      <li>
        <label for="title" class="label essential">할일</label>
        <input type="text" v-model="title" id="title" class="input" placeholder="할일 제목을 입력해주세요."/>
      </li>
      <li>
        <label for="content" class="label essential">내용</label>
        <textarea v-model="content" id="content" class="input" placeholder="할일 내용을 입력해주세요."></textarea>
      </li>
      <li>
        <label for="select_refer" class="label">참조 할일</label>
        <select id="select_refer" v-model="select_refer" class="input" title="참조할 할일을 선택해주세요." v-if="not_refer">
          <option value="default">참조 할일 선택하지 않음.</option>
          <option v-for="(todo, index) in todos" :key="index" :value="index">{{todo.title}}</option>
        </select>
        <ul class="select-refer-list">
          <li v-for="(refer, index) in this.refer" :key="index">
            <span>{{refer.title}}</span> <button type="button" @click="referDelete">X</button>
          </li>
        </ul>
        <p v-if="!not_refer" class="description">참조할 할일 목록이 없습니다.</p>
      </li>
      <li>
        <label for="category" class="label">범주</label>
        <div class="option-area">
          <input type="checkbox" v-model="category_create" id="category_create">
          <label for="category_create">범주 카테고리 추가</label>
        </div>
        <div v-if="category_create" class="">
          <input type="text" v-model="category_title" class="input input-category" placeholder="범주 카테고리 타이틀을 입력해주세요.">
          <div class="category-color" @click="onClickToolbar">
            <div class="color-item" :class="this.now_color">
            </div>
            <ul class="color-list" v-if="color_toolbar" @click="onClickColor">
              <li class="color-item color1"></li>
              <li class="color-item color2"></li>
              <li class="color-item color3"></li>
              <li class="color-item color4"></li>
              <li class="color-item color5"></li>
              <li class="color-item color6"></li>
              <li class="color-item color7"></li>
              <li class="color-item color8"></li>
            </ul>
          </div>
          <button type="button" class="btn-add" @click="setAddCategory">+</button>
        </div>
        <div v-else>
          <select id="category" class="category-list" v-model="select_category">
            <option value="default">범주를 지정하지 않음</option>
            <option v-for="(category, index) in categories" :key="index" :value="index">{{category[0]}}</option>
          </select>
          <div class="category-color" >
            <div class="color-item" :class="this.select_color"></div>
          </div>
        </div>
      </li>
      <li>
        <button type="submit" class="btn-submit" @click="onValidate">할일 등록</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { createNamespacedHelpers } from "vuex";

const todoModule = createNamespacedHelpers("todos");
export default {
  name: "TodoForm",
  data() {
    return {
      title : "",
      content : "",
      refer : [],
      category_title : "",
      now_color : "color1",
      select_color : "color1",
      select_category : "default",
      select_refer : "default",
      category_create : false,
      color_toolbar : false,
      not_refer : false,
      this_modify : false,
    };
  },
  computed: {
    ...todoModule.mapGetters(["todos","categories"])
  },
  created() {
    (this.$route.query.key)? this.getModifyData() : null;
    this.category_create = (this.categories.length > 0)? false : true;
    this.not_refer = (this.todos.length > 0)? true : false;
  },
  watch: {
    select_category (){
      if(this.select_color !== 'default'){
        this.select_color = this.categories[this.select_category][1];
      }
    },
    select_refer(){
      if(this.select_refer !== 'default'){
        const referArray = this.todos[this.select_refer];
        let referObject = {
          title : referArray.title,
          key : referArray.uuid,
        }
        if(this.refer.length < 3){
          if(this.refer.indexOf(referObject) !== -1){
            alert('이미 추가된 할일입니다.');
          }else if(referObject.key === this.uuid){
            alert('지금 할일을 참조할 수 없습니다.');
            this.select_refer = 'default';
          }else{
            this.refer.push(referObject);
          }
        }else{
          alert('참조할 수 있는 할일은 최대 3개까지입니다.');
        }
      }
    },
    category_create(){
      if( this.category_create === true ){
        this.category_title = "";
      }
    }
  },
  methods: {
    ...todoModule.mapActions(["addCategory","addTodo","putTodo"]),
    onClickToolbar(){
      (this.color_toolbar)? this.color_toolbar = false : this.color_toolbar = true;
    },
    onClickColor(e){
      if(e.target.classList.contains('color-item')){
        this.now_color = e.target.classList.value.split('color-item ').pop();
      }
    },
    setAddCategory(){
      if(!this.category_title){
        alert('카테고리를 입력해주세요.')
      }else{
        this.addCategory([this.category_title,this.now_color]);
        this.$nextTick(() => {
          alert('카테고리 범주가 추가 되었습니다.');
          this.now_color = "color1";
          this.category_create = false;
          this.select_category = "default";
        });
      }
    },
    getModifyData(){
      this.this_modify = true;
      const modifyData = this.todos.filter(e=> e.uuid === this.$route.query.key)[0];
      this.title = modifyData.title;
      this.content = modifyData.content;
      this.select_category = this.categories.findIndex(e => e[0] === modifyData.category[0]);
      this.refer = modifyData.refer;
      this.select_color = modifyData.category[1];
      this.title = modifyData.title;
      this.uuid = modifyData.uuid;
    },
    referDelete(e){
      const delete_this = e.target.parentElement.innerText.replace(' X','');
      if(this.refer.length >1){
        this.refer = this.refer.filter(r=>r.title !== delete_this);
      }else{
        this.refer = ""
      }
    },
    getUnixTime(){
      const now = new Date();
      const date = {
        y:now.getFullYear(),
        m:(now.getMonth() + 1 < 10)? '0' + (now.getMonth() + 1) : now.getMonth() + 1,
        d:(now.getDate()< 10)? '0' + now.getDate() : now.getDate(),
        h:(now.getHours()< 10)? '0' + now.getHours() : now.getHours(),
        t_m:(now.getMinutes()< 10)? '0' + now.getMinutes() : now.getMinutes(),
      };
      return `${date.y}/${date.m}/${date.d}/${date.h}:${date.t_m}`
    },
    onValidate(){
      let next = true;
      let msg = "";
      let submitFn = this.this_modify? this.onModifyForm() : this.onSubmitForm();

      next &&
        !this.content &&
        ((next = false), (msg = "할일의 내용을 입력해주세요!"));
        !this.title &&
        ((next = false), (msg = "할일의 제목을 입력해주세요!"));
      next && submitFn;
      !next && alert(msg);
    },
    onSubmitForm(){
      this.addTodo({
        title : this.title,
        content : this.content,
        refer : this.refer,
        category : this.categories[this.select_category],
        uuid : uuidv4(),
        creat_at : this.getUnixTime(),
        complete : false
      });
      this.$nextTick(() => {
        alert('할일이 성공적으로 등록되었습니다.');
        this.$router.push("/")
      });
    },
    onModifyForm(){
      const beforeData = this.todos.filter(e=> e.uuid === this.$route.query.key)[0];
      this.putTodo({
        title : this.title,
        content : this.content,
        refer : this.refer,
        category : this.categories[this.select_category],
        uuid : beforeData.uuid,
        creat_at : beforeData.creat_at,
        modify_at : this.getUnixTime(),
        complete : beforeData.complete
      });
      this.$nextTick(() => {
        alert('할일이 성공적으로 수정되었습니다.');
        this.$router.push("/")
      });
    },
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .todo-form{
    width:90%;
    min-height:100%;
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
          width:100%;
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
        .category-list{
          display:inline-block;
          height:40px;
          font-size:16px;
          width:calc(100% - 48px);
          vertical-align:middle;
        }
        .input-category{
          display:inline-block;
          width:calc(100% - 100px);
          vertical-align:middle;
        }
        .category-color{
          display:inline-block;
          position:relative;
          width:40px;
          height:38px;
          margin-left:6px;
          text-align:center;
          background:#fff;
          border-radius:5px;
          box-shadow:2px 2px 5px rgba(0,0,0,.2);
          vertical-align:middle;
          .color-item{
            display:inline-block;
            width:20px;
            height:20px;
            border-radius:50%;
            &.color1{
              background:$color1;
            }
            &.color2{
              background:$color2;
            }
            &.color3{
              background:$color3;
            }
            &.color4{
              background:$color4;
            }
            &.color5{
              background:$color5;
            }
            &.color6{
              background:$color6;
            }
            &.color7{
              background:$color7;
            }
            &.color8{
              background:$color8;
            }
          }
          >.color-item{
            position:relative;
            top:8px;
          }
          .color-list{
            box-sizing:border-box;
            position:absolute;
            bottom:45px;
            left:0;
            width:40px;
            padding:10px;
            background:#fff;
            border-radius:40px;
            box-shadow:2px 2px 5px rgba(0,0,0,.2);
          }
        }
        .btn-add{
          overflow:hidden;
          display:inline-block;
          width:40px;
          height:38px;
          margin-left:5px;
          background:$theme_main_bg;
          border-radius:5px;
          box-shadow:2px 2px 5px rgba(0,0,0,.2);
          color:$theme_main_color;
          font-size:38px;
          vertical-align:middle;
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
