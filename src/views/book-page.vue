<template>
  <div class="book-main">
     <router-link class="link" to="/book/edit">Add Book</router-link>
    <router-view />
    <book-filter @filter="setFilter" />
    <book-list @remove="removeBook" :books="booksToShow"  :googleList="false" />
   
  </div>
</template>

<script>
import BookList from "../components/book-list.vue";
import BookFilter from "../components/book-filter.vue";
import BookEdit from "../components/book-edit.vue";
import eventBus from "../services/eventBus.service.js";



export default {
  name: "book-page",
  computed: {
    booksToShow() {
      return this.$store.getters.booksToShow;
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = { ...filterBy };
      this.$store.commit("setBookFilter", { ...filterBy });
    },
    removeBook(id) {
      this.$store.dispatch({ type: "removeBook", id });
      eventBus.$emit("new-msg", {txt:'Book got deleted'});
    }
  },
  async created() {
    await this.$store.dispatch({ type: "loadBooks" });
  },
  components: {
    BookList,
    BookFilter,
    BookEdit
  }
};
</script>


<style scoped lang="scss">
.book-main {
  margin-top:20px;
}
.link {
  color: blue;
  font-size: 1.5rem;
  padding-top: 20px;
}
</style>