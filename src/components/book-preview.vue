<template>
  <div class="book-preview flex column space-between align-center">
    <h4>{{book.title}}</h4>
    <h4>By {{book.author}}</h4>
    <h5>{{currencySign}}{{book.listPrice.amount}}</h5>
    <img :src="book.thumbnail"/>
  </div>
</template>

<script>
export default {
  name: "book-preview",
  props: ["book"],
  computed : {
      currencySign() {
          return this.book.listPrice.currencyCode === 'USD' ? '$' : '₪' 
      }
  }
};
</script>

<style scoped lang="scss">
.book-preview {
  // padding: 20px;
  width: 260px;
  height: 370px;
  img {
   border-radius: 10px;
   margin-bottom: 10px;
  }
}
</style>