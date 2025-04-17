<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="top">
				<view class="imgWrap">
					<img src="@/static/phone.png" alt="">
				</view>
				<view class="info">
					<text class="appName">慧穹智慧</text>
					<text class="version">Version 3.9.0</text>
				</view>
			</view>
			<view class="itemWrap">
				<Item text="功能介绍" :fuc="goToFunctionPage" />
				<Item text="版本更新" :fuc="checkForUpdate" />
			</view>
		</view>
	</view>
</template>

<script>
import Item from '@/components/Item.vue';

export default {
	data() {
		return {
			containerHeight: 0,
		}
	},
	components: {
		Item
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	methods: {
		goToFunctionPage() {
			uni.navigateTo({
				url: '/pages/myPage/AboutInfo/functionPage'
			});
		},
		checkForUpdate() {
			uni.showToast({
				title: '已经是最新版本',
				icon: 'none'
			});
		},
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
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.top {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 40rpx;
	padding: 100rpx 0;
}

img {
	width: 120rpx;
}

.info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15rpx;
}

.appName {
	font-size: 40rpx;
	color: #48474F;
	font-weight: bold;
}

.version {
	font-size: 30rpx;
	color: #48474F;
}

.itemWrap {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 8px;
	overflow: hidden;
}
</style>
