<template>
  <div class="long-text">
    <p class="desc" v-if="this.buttonText==='More'">{{shortText}}</p>
    <p  class="desc" v-if="this.buttonText==='Less'">{{this.text}}</p>
    <button v-if="this.text.length>100" @click="toggleText">{{this.buttonText}}</button>
  </div>
</template>

<script>
export default {
  name: "long-text",
  props: ["text"],
  data() {
    return {
      buttonText: "More"
    };
  },
  computed: {
    shortText() {
        if (!this.text) return 'N/A'
      return this.text.substr(0, 100) + "...";
    }
  },
  methods: {
    toggleText() {
      this.buttonText = this.buttonText === "More" ? "Less" : "More";
    }
  }
};
</script>

<style scoped lang="scss">
.long-text {
    // p {
    //     text-align: left
    // }
}

</style>