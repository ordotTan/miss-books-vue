<template>
  <div class="book-edit">
    <button @click="close" class="close-btn">Cancel</button>
    <form class="book-edit column-layout" @submit.prevent="saveBook">
      <div class="form-input flex align-center space-around">
        <span>Title</span>
        <input
          ref="titleInput"
          v-model.trim="bookToEdit.title"
          type="text"
          placeholder="Title"
          required
        />
      </div>
      <div class="form-input flex align-center space-around">
        <span>Author</span>
        <input v-model.trim="bookToEdit.author" type="text" placeholder="Author" />
      </div>
      <div class="form-input flex align-center space-around">
        <span>Description</span>
        <input v-model.trim="bookToEdit.description" type="text" placeholder="Description" />
      </div>
      <div class="form-input flex align-center space-around">
        <span>Price</span>
        <input v-model.number="bookToEdit.listPrice.amount" type="number" placeholder="Price" />
      </div>
      <div class="form-input flex align-center space-between">
        <span>Page Count</span>
        <input v-model.number="bookToEdit.pageCount" type="number" placeholder="Page count" />
      </div>
      <div class="form-input flex align-center space-between">
        <span>Image URL</span>
        <input v-model.number="bookToEdit.thumbnail" type="text" placeholder="Image URL" />
      </div>

      <button>Save!</button>
    </form>
  </div>
</template>

<script>
import bookService from "../services/book.service.js";
import eventBus from "../services/eventBus.service.js";

export default {
  name: "book-edit",
  data() {
    return {
      bookToEdit: bookService.getEmptyBook()
    };
  },
  methods: {
    async saveBook() {
      const txt = this.bookToEdit._id ? "Book updated" : "New book added";
      const book = await this.$store.dispatch({
        type: "saveBook",
        book: this.bookToEdit
      });
      eventBus.$emit("new-msg", { txt, link: "book/" + book._id });
      this.bookToEdit = bookService.getEmptyBook();
      this.close();
    },
    close() {
      this.$router.push("/book");
    },
    async loadBook() {
      var id = this.$route.params.id;
      this.bookToEdit = JSON.parse(
        JSON.stringify(await this.$store.dispatch({ type: "getBookById", id }))
      );
    }
  },
  created() {
    this.loadBook();
  },
  mounted() {
    this.$refs.titleInput.focus();
  },
  watch: {
    "$route.params.id"(curr, prev) {
      this.loadBook();
    }
  }
};
</script>

<style scoped lang="scss">
.book-edit {
  .form-input {
    span {
      width: 100px;
      text-align: left;
    }
  }

  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>