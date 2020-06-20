<template>
  <div class="review-add">
    <form class="flex column justify-center align-center" @submit.prevent="saveReview">
      <section class="input">
        <input
          ref="nameInput"
          type="text"
          v-model.trim="review.author"
          placeholder="Your Name"
          required
        />
        Stars:
        <select v-model.number="review.rate">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="date" v-model="review.readAt" />
        <input
          type="textarea"
          v-model="review.comment"
          rows="4"
          cols="50"
          placeholder="Your comment"
        />
      </section>
      <section class="actions">
        <button>Submit</button>
        <button @click="close">Close</button>
      </section>
    </form>
  </div>
</template>

<script>
import eventBus from "../services/eventBus.service.js";

export default {
  name: "review-add",
  data() {
    return {
      currBookId: "",
      review: {
        author: "Default Reader",
        rate: "5",
        readAt: new Date().toISOString().slice(0, 10),
        comment: ""
      }
    };
  },
  methods: {
    saveReview() {
      this.$store.dispatch({
        type: "addReview",
        id: this.currBookId,
        review: this.review
      });
      eventBus.$emit("new-msg", { txt: "New review Added" });
      this.close();
    },
    close() {
      this.$router.push("/book/" + this.currBookId);
    }
  },
  created() {
    this.currBookId = this.$route.params.id;
  },
  mounted() {
    this.$refs.nameInput.focus();
  }
};
</script>

<style scoped lang="scss">
.review-add {
  margin-bottom: 60px;
  form {
    input {
      margin: 10px;
    }
    button {
      background-color: green;
      padding: 10px;
      color: white;
      font-size: 16px;
      margin: 5px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>