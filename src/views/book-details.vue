<template>
  <section class="book-details">
    <div class="book-info">
      <h2>{{book.title}} by {{book.author}}</h2>
      <div class="links">
        <router-link v-if="this.prevNextBooks.prevId" :to="'/book/'+this.prevNextBooks.prevId">Previous Book</router-link>
        <router-link v-if="this.prevNextBooks.nextId" :to="'/book/'+this.prevNextBooks.nextId">Next Book</router-link>
      </div>
      <img class="book-main-img" :src="book.thumbnail" />
      <div class="price-section flex align-center justify-center">
        <p :class="priceClass">
          <span>Price:</span>
          {{currencySign}}{{book.listPrice.amount}}
        </p>
        <img v-if="book.listPrice.isOnSale" src="../assets/sale.png" />
      </div>
      <p>
        <span>Description:</span>
        <long-text :text="book.description" />
      </p>
      <p>
        <span>Pages:</span>
        {{book.pageCount}} {{readingType}}
      </p>
      <p>
        <span>Published at:</span>
        {{publishDate}} {{bookSeniority}}
      </p>
    </div>
    <router-link :to="'/book/'+book._id+'/review'">Add Review</router-link>
    <router-view />
    <review-list
      v-if="this.reviewsToShow.length>0"
      @removeReview="removeReview"
      :reviews="this.reviewsToShow"
    />
  </section>
</template>

<script>
import LongText from "../components/long-text.vue";
import ReviewAdd from "../components/review-add.vue";
import ReviewList from "../components/review-list.vue";
import bookService from "../services/book.service.js";
import Moment from "moment";
import eventBus from "../services/eventBus.service.js";
import Swal from "sweetalert2";

export default {
  name: "book-details",
  data() {
    return {
      book: bookService.getEmptyBook(),
      prevNextBooks: {}
    };
  },
  methods: {
    async removeReview(id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete review"
      });
      if (result.value) {
        this.$store.dispatch({
          type: "removeReview",
          reviewId: id,
          bookId: this.book._id
        });
        eventBus.$emit("new-msg", { txt: "Review got deleted" });
      }
    },
    async loadBook() {
      var id = this.$route.params.id;
      this.prevNextBooks = await bookService.getNextPrevBooks(id);
      this.book = JSON.parse(
        JSON.stringify(await this.$store.dispatch({ type: "getBookById", id }))
      );
    }
  },
  computed: {
    reviewsToShow() {
      return this.$store.getters.reviewsToShow;
    },
    bookSeniority() {
      if (!this.book.publishDate) return "N/A";
      const bookAgeYears =
        (Date.now() - this.book.publishDate) / (60 * 60 * 24 * 365 * 1000);
      let bookSeniority;
      if (bookAgeYears <= 1) bookSeniority = "New!";
      else if (bookAgeYears >= 10) bookSeniority = "Veteran";
      return bookSeniority;
    },
    publishDate() {
      if (!this.book.publishDate) return;
      return Moment(this.book.publishDate).format("DD-MM-YYYY");
    },
    readingType() {
      if (!this.book.pageCount) return "N/A";
      let readingType;
      const pages = this.book.pageCount;
      if (pages > 500) readingType = "Long reading";
      else if (pages > 200) readingType = "Decent reading";
      else if (pages < 100) readingType = "Light reading";
      return readingType;
    },
    priceClass() {
      return {
        cheap: this.book.listPrice.amount <= 20,
        expensive: this.book.listPrice.amount >= 200
      };
    },
    currencySign() {
      return this.book.listPrice.currencyCode === "USD" ? "$" : "₪";
    }
  },
  created() {
    this.loadBook();
  },
  watch: {
    "$route.params.id"(curr, prev) {
      this.loadBook();
    }
  },
  components: {
    LongText,
    ReviewAdd,
    ReviewList
  }
};
</script>

<style scoped lang="scss">
.book-details {
  margin: 20px 50px 60px 50px;
  h2 {
    margin-bottom: 15px;
  }
  .links {
    margin-bottom: 15px;
  }
  a {
    color: blue;
    font-size: 20px;
    margin-bottom: 60px;
    
    &:first-child {
      margin-right: 20px;
    }
  }

  p {
    font-size: 20px;
    margin: 10px;
    &.cheap {
      color: green;
    }
    &.expensive {
      color: red;
    }
    span {
      font-weight: 700;
    }
  }
  img {
    width: 100px;
    &.book-main-img {
      width: 250px;
      border-radius: 10px;
    }
  }
}
</style>