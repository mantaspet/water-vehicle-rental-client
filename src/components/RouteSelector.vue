<template>
  <div class="mdc-card" style="margin: 12px 0 96px 0">
    <h2 class="ma-3 mdc-typography--headline6">
      <div>Pasirinkite maršrutą:</div>
			<div class="mdc-select">
				<i class="mdc-select__dropdown-icon"></i>
				<select v-model="selectedRoute" class="mdc-select__native-control">
					<option v-for="route in availableRoutes" :key="route.text" :value="route.text">{{ route.text }}</option>
				</select>
				<label class="mdc-floating-label">Pasirinkite maršrutą</label>
				<div class="mdc-line-ripple"></div>
			</div>
    </h2>
		<iframe v-if="selectedRoute" :src="selectedMapUrl" height="800"></iframe>
  </div>
</template>

<script>
import { MDCSelect } from "@material/select";

export default {
  name: "RouteSelector",

  data() {
    return {
      availableRoutes: [
				{ text: "Kaunas - Kačerginė - Kaunas", 						mapUrl: "https://www.google.com/maps/d/embed?mid=1NaYrtrJraCmY5L42jYeZTIVxJop0Aj6j" },
				{ text: "Kaunas - Lapės - Kaunas", 								mapUrl: "https://www.google.com/maps/d/embed?mid=17A_UqIvlDi8OvYxTlQXlIhe5MFdcs5Av" },
				{ text: "Kaunas - Kauno hidroelektrinė - Kaunas", mapUrl: "https://www.google.com/maps/d/embed?mid=1Hjqm7Sen5L9GWLoA3VHCHTol5f7JehgG" },
			],
			selectedRoute: "",
			selectedMapUrl: "https://www.google.com/maps/d/embed?mid=1NaYrtrJraCmY5L42jYeZTIVxJop0Aj6j",
    };
  },

  mounted() {
    const select = new MDCSelect(document.querySelector(".mdc-select"));
	},

	watch: {
		selectedRoute(val) {
			this.availableRoutes.forEach(route => {
				if (route.text === val) {
					this.selectedMapUrl = route.mapUrl;
					this.$emit('routeSelected', val);
				}
			});
		}
	},
};
</script>

<style lang="scss" scoped>
h2 {
	align-items: center;
	display: flex;
	justify-content: space-between;
}
</style>
