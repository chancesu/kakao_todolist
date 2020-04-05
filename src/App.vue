<template>
  <div id="app">
      <router-view/>
  </div>
</template>


<style lang="scss">
@import './assets/variables.scss';
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select {
  margin: 0;
  padding: 0;
}

body,h1,h2,h3,h4,h5,h6,input,button,table,select,textarea {
  font-family: $default-font;
  letter-spacing: -0.05em;
  word-spacing: normal;
}
caption,hr,legend {
  display: none;
}
li {
  list-style: none;
}
html,body{
  background:#7b7b7b;
}
html,body,#app,.wrap{
  width:100%;
  height:100%;
}
#app{
  a{
    text-decoration:none;
  }
}
</style>
