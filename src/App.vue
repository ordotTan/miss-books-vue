<template>
  <div id="app">
    <app-header/>
    <router-view />
    <app-footer/>
  </div>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'


export default {
  name:"mainApp",
  components: {
    appHeader,
    appFooter
  }
  
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin:auto;
}
</style>
