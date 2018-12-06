<template>
  <div id="review-dialog" class="mdc-dialog">
    <div class="mdc-dialog__container">
      <form @submit.prevent="saveReview">
        <div class="mdc-dialog__surface">
          <h2 class="mdc-dialog__title" id="my-dialog-title">{{ title }}</h2>
          <div class="mdc-dialog__content" id="my-dialog-content">
            <div id="comment" class="mdc-text-field mdc-text-field--textarea mdc-text-field--box">
              <textarea v-model="comment" id="textarea" class="mdc-text-field__input" rows="4" cols="40"/>
              <label for="textarea" class="mdc-floating-label">Komentaras</label>
            </div>
          </div>

          <footer class="mdc-dialog__actions">
            <button type="submit" class="mdc-button mdc-dialog__button">Išsaugoti</button>
          </footer>
        </div>
      </form>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";

export default {
  name: "ReviewDialog",

  props: {
		points: Number,
		reservation: Object,
  },

  data() {
    return {
			comment: ''
		};
  },

  computed: {
    title() {
      switch (this.points) {
				case 5:
					return 'Ačiū! Gal turite pasiūlymų, ką galėtume patobulinti?';
          break;
				case 4:
					return 'Ačiū! Gal turite pasiūlymų, ką galėtume patobulinti?';
          break;
				case 3:
					return 'Mums labai svarbi Jūsų nuomonė! Padėkite mums teikti geresnes paslaugas parašydami, kas nepatiko';
          break;
				case 2:
					return 'Mums labai svarbi Jūsų nuomonė! Padėkite mums teikti geresnes paslaugas parašydami, kas nepatiko';
          break;
				case 1:
					return 'Mums labai svarbi Jūsų nuomonė! Padėkite mums teikti geresnes paslaugas parašydami, kas nepatiko';
					break;
				default:
					return 'Mums labai svarbi Jūsų nuomonė! Padėkite mums teikti geresnes paslaugas parašydami, kas nepatiko';
      }
    }
  },

  mounted() {
    new MDCTextField(document.querySelector("#comment"));
  },

  methods: {
    saveReview() {
			const review = {
				comment: this.comment,
				points: this.points,
			};
			this.$store.dispatch('createReview', {
				reservation: this.reservation,
				review,
			}).then(() => {
				this.$emit('closeDialog');
				this.comment = '';
			});
		}
  }
};
</script>

<style lang="scss" scoped>
.mdc-text-field {
  margin: 8px auto;
  width: 100%;
}
</style>
