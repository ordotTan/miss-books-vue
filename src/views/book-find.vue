<template>
  <section class="book-find">
    <h1>Google Books</h1>
    <h3>(Click a result to add to your collection)</h3>
    <input @input="searchGoole" type="text" v-model="searchStr" placeholder="Search for a book ..." />
    <book-list :books="this.bookResults" :googleList="true"/>
  </section>
</template>

<script>
import googleService from "../services/googleBooks.service";
import BookList from "../components/book-list.vue";

export default {
  name: "book-find",
  data() {
    return {
      searchStr: "",
      bookResults: []
    };
  },
  methods: {
    async searchGoole() {
      const results = await googleService.queryGoogle(this.searchStr);
      this.bookResults = results;
    }
  },
  components: { BookList }
};
</script>

<style scoped lang="scss">
.book-find {
  h1 {
    margin:10px;
  }
  h3 {
    margin-bottom: 20px;
  }
  input {
    font-size: 25px;
    width: 300px;
  }
}
</style>