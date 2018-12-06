<template>
  <div class="mdc-card">
    <ul v-show="reviews.length" class="mdc-list mdc-list--non-interactive pa-0">
      <template v-for="(review, index) of reviews">
        <li :key="review.id" class="mdc-list-item" tabindex="0">
          <div class="mdc-list-item__text">
            <button v-if="review.points === 5" class="mdc-icon-button" type="button" disabled>
              <img src="../assets/heart-emoji.png" class="mdc-icon-button__icon">
            </button>
            <button v-else-if="review.points === 4" class="mdc-icon-button" type="button" disabled>
              <img src="../assets/face-with-heart-eyes-emoji.png" class="mdc-icon-button__icon">
            </button>
            <button v-else-if="review.points === 3" class="mdc-icon-button" type="button" disabled>
              <img src="../assets/thinking-emoji.png" class="mdc-icon-button__icon">
            </button>
            <button v-else-if="review.points === 2" class="mdc-icon-button" type="button" disabled>
              <img src="../assets/tear-emoji.png" class="mdc-icon-button__icon">
            </button>
            <button v-else-if="review.points === 1" class="mdc-icon-button" type="button" disabled>
              <img src="../assets/crying-emoji.png" class="mdc-icon-button__icon">
            </button>
						<div>
							{{ review.comment }}
						</div>
        
          </div>
        </li>
        <li
          v-if="index < reviews.length - 1"
          :key="index"
          role="separator"
          class="mdc-list-divider"
        ></li>
      </template>
    </ul>
    <h3 v-if="!reviews.length" class="mdc-typography--body1">Įrašų nėra</h3>
  </div>
</template>

<script>
import { MDCList } from "@material/list";

export default {
  name: "ReviewList",

  props: {
    reviews: Array
  },

  mounted() {
    new MDCList(document.querySelector(".mdc-list"));
  }
};
</script>

<style lang="scss" scoped>
h3 {
  padding-left: 12px;
}

.mdc-list-item__text {
	display: flex;
	align-items: center;
}

.mdc-icon-button {
	margin-right: 12px;
}
</style>
