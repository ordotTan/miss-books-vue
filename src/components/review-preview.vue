<template v-if="true">
  <div>
    <!-- <tr class="home"> -->
    <td>{{review.author}}</td>
    <td>{{review.rate}}</td>
    <!-- </tr> -->
  </div>
</template>

<script>
export default {
  name: "review-preview",
  props: ["review"]
};
</script>
