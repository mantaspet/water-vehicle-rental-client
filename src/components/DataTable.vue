<template>
<div class="mdc-card">
  <table>
		<thead>
			<slot name="headers"></slot>
		</thead>
		<tbody>
			<slot name="items"></slot>
		</tbody>
	</table>
</div>
</template>

<script>
export default {
	name: "DataTable",
}
</script>

<style lang="scss" scoped>
table {
	border-collapse: collapse;
	font-size: 0.875rem;
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

tr:hover {
	cursor: pointer;
	background: #eee;
}

th {
	color: rgba(0,0,0,0.54);
}
</style>

