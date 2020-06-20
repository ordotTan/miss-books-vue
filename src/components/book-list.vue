<template>
  <div class="book-list">
    <ul class="clean-list flex align-center justify-center wrap">
      <li class="book" v-for="book in books" :key="book._id">
        <book-preview v-if="!googleList" @click.native="bookDetails(book._id)" :book="book" />
        <book-preview v-if="googleList" @click.native="addGoogleBook(book)" :book="book" />
        <div class="actions flex space-between align-center">
          <router-link v-if="!googleList" :to="'/book/edit/'+book._id">Edit</router-link>
          <button v-if="!googleList" @click="remove(book._id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BookPreview from "../components/book-preview.vue";
import eventBus from "../services/eventBus.service.js";
import Swal from "sweetalert2";

export default {
  name: "book-list",
  props: ["books", "googleList"],
  components: {
    BookPreview
  },
  methods: {
    async remove(bookId) {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete book"
      });
      if (result.value) this.$emit("remove", bookId);
    },
    bookDetails(bookId) {
      this.$router.push(`/book/${bookId}`);
    },
    async addGoogleBook(book) {
      delete book._id; //as we're about to give it internal ID
      await this.$store.dispatch({
        type: "saveBook",
        book
        // fromGoogle: true
      });
      eventBus.$emit("new-msg", { txt: "New book added!", link: book._id });
    }
  }
};
</script>

<style scoped lang="scss">
.book-list {
  padding-top: 20px;
  margin-bottom: 60px;

  .book {
    cursor: pointer;
    font-size: 20px;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    &:hover {
      background-color: gold;
    }
    button:hover {
      background-color: red;
    }
    a {
      color: blue;
      margin-right: 20px;
    }
  }
}
</style>