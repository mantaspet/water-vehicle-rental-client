<template>
<div class="mdc-card">
  <table v-if="items.length">
		<thead class="mdc-typography--subtitle2">
			<slot name="headers"></slot>
		</thead>
		<tbody :class="[{'clickable-rows': clickableRows}, 'mdc-typography--body2']">
			<slot name="items"></slot>
		</tbody>
	</table>
	<h3 v-else class="mdc-typography--body1">Įrašų nėra</h3>
</div>
</template>

<script>
export default {
	name: "DataTable",

	props: {
		clickableRows: {
			type: Boolean,
			default: false,
		},
		items: Array,
	},
}
</script>

<style lang="scss" scoped>
h3 {
	padding-left: 12px;
}

table {
	border-collapse: collapse;
}

th, td {
	text-align: right;
}

td {
	border-top: 1px solid rgba(0,0,0,0.12);
}

th:first-child, td:first-child	 {
	text-align: left;
	padding-left: 16px;
}

th:last-child, td:last-child	 {
	padding-right: 16px;
}

tr, th {
	height: 48px;
}

.clickable-rows tr:hover {
	cursor: pointer;
	background: #eee;
}

th {
	color: rgba(0,0,0,0.54);
}
</style>

