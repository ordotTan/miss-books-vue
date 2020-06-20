<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      myInterval:''
    };
  },
  created() {
    this.myInterval = setInterval(() => {
      console.log("Still on about page...");
    }, 2000);
  },
  mounted() {
    console.log("Got to about page!");
  },

  destroyed() {
    clearInterval(this.myInterval);
    console.log("Left about page...");
  }
};
</script>

<style scoped lang="scss">
.about {
    margin-top:20px;
}
</style>