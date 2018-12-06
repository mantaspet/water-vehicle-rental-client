<template>
  <div>
		<h1 class="mdc-typography--headline4">Atsiliepimai</h1>
    <ReviewList :reviews="$store.getters.reviews"/>
  </div>
</template>

<script>
import ReviewList from "../components/ReviewList";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export default {
  name: "Reviews",

  components: {
    ReviewList
  },

  created() {
    this.$store.dispatch("getReviews");
  },
};
</script>
