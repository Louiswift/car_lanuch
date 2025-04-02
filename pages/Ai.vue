<template>
	<view></view>
</template>

<script>

export default {
	onTabItemTap(item) {
		uni.$emit("tabChanged", item);
	},
}
</script>

<style scoped>

</style>