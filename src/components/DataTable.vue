<template>
	<table>
		<thead>
			<slot name="headers"></slot>
		</thead>
		<tbody>
			<slot name="items"></slot>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "DataTable",
}
</script>

<style lang="scss" scoped>

</style>

