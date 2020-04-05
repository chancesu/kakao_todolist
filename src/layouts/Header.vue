<template>
  <div id="header">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/write">Write</router-link>-->
    <HeaderNow></HeaderNow>
  </div>
</template>

<script>
import HeaderNow from '@/components/HeaderNow.vue'

export default {
  name: 'Header',
  components: {
    HeaderNow
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
  #header{
    position:relative;
    padding:20px 20px 10px 20px;
    background : $theme_main_bg;
    color:#fff;
    a{
      color:#fff;
    }
  }
</style>
