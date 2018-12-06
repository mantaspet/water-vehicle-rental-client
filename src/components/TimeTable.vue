<template>
<div class="mdc-card">
	<h2 class="ma-3 mdc-typography--headline6">
		{{ title }}
		<span style="float: right">
			{{ selectedTime }}	
		</span>	
	</h2>
  <table>
		<thead class="mdc-typography--subtitle2">
			<slot name="headers"></slot>
		</thead>
		<tbody class="mdc-typography--body2">
			<slot name="items"></slot>
		</tbody>
	</table>
	<div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button class="mdc-button mdc-card__action mdc-card__action--button" @click="$emit('lastWeekClick')">Praeita savaitė</button>
      <button class="mdc-button mdc-card__action mdc-card__action--button" @click="$emit('nextWeekClick')">Sekanti savaitė</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: "DataTable",

	props: {
		title: {
			type: String,
			default: 'Pasirinkite rezervacijos laiką:',
		},
		selectedTime: {
			type: String,
			default: '',
		},
	},
}
</script>

<style lang="scss" scoped>
table {
	border-collapse: collapse;
	width: 100%;
}

th, td {
	text-align: center;
}

td {
	border: 1px solid rgba(0,0,0,0.12);
	width: 120px;
}

td:not(:first-child) {
	background: lightgreen;
}

th:first-child, td:first-child	 {
	width: 200px;
}

tr, th {
	height: 48px;
}

td:not(:first-child):hover {
	cursor: pointer;
	background: #90ee909c;
}

th {
	color: rgba(0,0,0,0.54);
}

.mdc-card__action-buttons {
	width: 100%;
  justify-content: space-between;
}

.taken-time {
	cursor: default !important;
	background: red !important;
}

.selected-time {
	cursor: default !important;
	background: #00b117ad !important;
}
</style>

