<template>
  <div class="user-msg flex space-between align-center" :class="this.msgClass">
    <h3>{{msg}}</h3>
    <router-link v-if="this.msgLink" :to="this.msgLink">Check it out</router-link>
    <button @click="close">X</button>
  </div>
</template>

<script>
import eventBus from "../services/eventBus.service.js";

export default {
  data() {
    return {
      msg: "",
      msgLink: "",
      msgClass: { hidden: true }
    };
  },
  methods: {
    newReviewMsg(payload) {
      this.msg = payload.txt;
       this.msgLink = payload.link;
      this.msgClass.hidden = false;
      setTimeout(() => {
        this.msg = "";
        this.msgLink = '';
        this.msgClass.hidden = true;
      }, 3000);
    },
    close() {
      this.msg = "";
      this.msgClass.hidden = true;
    }
  },

  created() {
    eventBus.$on("new-msg", this.newReviewMsg);
  }
};
</script>

<style scoped lang="scss">
.user-msg {
  position: fixed;
  top: 0;
  right: 0;
  border: 1px solid black;
  padding: 7px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  &.hidden {
    display: none;
    padding: 7px;
    background-color: #fff;
  }
  h3 {
      margin-right:7px;
  }
  a {
      color: blue !important;
  }
  button {
    margin-left: 20px;
    background-color: lightgray;
  }
}
</style>