<template>
	<view>
		<u-tabbar :value="Number(currentValue)" @change="name => currentValue = name" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="gotoNav(0)"></u-tabbar-item>
			<u-tabbar-item text="服务" icon="grid" @click="gotoNav(1)"></u-tabbar-item>
			<u-tabbar-item text="AI" icon="mic" @click="audioCHangeWord()">
			</u-tabbar-item>
			<u-tabbar-item text="数据" icon="order" @click="gotoNav(2)"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="gotoNav(3)"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	name: "Nav",
	data() {
		return {
			currentValue: this.value,
			isListening: false, // 判断是否在语音监听中

		};
	},
	props: { value: String },
	methods: {
		handleTabChange() {
			uni.showToast({
				title: "已切换到首页",
				icon: "none"
			});
		},
		gotoNav(index) {
			switch (index) {
				case 0:
					uni.switchTab({
						url: '/pages/home'
					})
					break;
				case 1:
					uni.switchTab({
						url: '/pages/service'
					})
					break;
				case 2:
					uni.switchTab({
						url: '/pages/shuju'
					})
					break;
				case 3:
					uni.switchTab({
						url: '/pages/myPage'
					})
					break;
			}
		}
	}
}
</script>