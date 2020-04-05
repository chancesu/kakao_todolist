<template>
  <div id="todo-wrap">
    <div class="container">
      <Header id="header"></Header>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/layouts/Header.vue'
export default {
  name: 'Layout',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
  #todo-wrap{
    min-height:100%;
    .container{
      max-width:800px;
      min-width:320px;
      min-height:100vh;
      margin:0 auto;
      background:#e9e9e9;
      .content{
        box-sizing:border-box;
        padding:20px;
      }
    }
  }
</style>
