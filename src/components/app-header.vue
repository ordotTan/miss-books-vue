<template>
    <div id="nav">
      <user-msg/>
      <router-link to="/">Home</router-link>|
      <router-link to="/book">Books Catalog</router-link>|
      <router-link to="/book/edit">Add Book</router-link>|
      <router-link to="/book/find">Find Book</router-link>|
      <router-link to="/about">About</router-link>
    </div>
</template>

<script>

import userMsg from '../components/user-msg'

export default {
  name:"appHeader",
  components: {
    userMsg
  }
}
</script>

<style lang="scss">
#nav {
  padding: 30px;
  background-color: lightblue;
  border-bottom: 1px solid grey;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size:20px;
    margin: 15px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>