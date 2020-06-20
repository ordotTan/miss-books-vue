<template>
  <div class="home flex justify-center align-iterm">
    <img src="../assets/books.jpg"/>
    <h1>Welcome to "Miss Books"</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
<style scoped lang="scss">
.home {
  img {
    text-align:center;
  }
  h1 {
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 80px;
    top:350px;
  }
}
</style>
