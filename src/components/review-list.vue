<template>
  <div class="review-list">
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rank</th>
          <th>Read At</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="review" v-for="review in reviews" :key="review._id">
          <td>{{review.author}}</td>
          <td>{{review.rate}}</td>
          <td>{{review.readAt}}</td>
          <td>{{review.comment}}</td>
          <td> <button @click="remove(review._id)">Delete</button> </td>
          <!-- <review-preview :review="review" /> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReviewPreview from "../components/review-preview.vue";

export default {
  name: "review-list",
  props: ["reviews"],
  methods: {
    remove(reviewId) {
      this.$emit("removeReview", reviewId);
    }
  },
  components: {
    ReviewPreview
  }
};
</script>

<style scoped lang="scss">
table {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 60px;
  td,
  th {
    padding: 10px;
  }
}
</style>