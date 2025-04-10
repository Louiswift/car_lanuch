<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view v-for="(item, index) in songList" :key="index" class="card">
				<image :src="item.picUrl" mode="aspectFill" class="cover" />
				<text class="title">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			containerHeight: 0,
			songList: []
		}
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	methods: {
		
	}
}

</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
}

.content {
	display: grid;
	grid-template-columns: repeat(2, minmax(300rpx, 1fr));
	gap: 20px;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.card {
	margin-bottom: 20rpx;
}

.cover {
	width: 100%;
	border-radius: 10rpx;
}

.title {
	margin-top: 10rpx;
	font-size: 26rpx;
	color: #333;
}
</style>
