<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="wrap">
				<view class="options">
					<UserinfoItem title="头像" type="avctor" />
					<UserinfoItem title="名字" type="value" :content="userInfo.username" />
					<UserinfoItem title="邮箱" type="value" :content="userInfo.email" />
					<UserinfoItem title="手机号" type="value" :content="maskedPhone" />
				</view>
			</view>
			<view class="content">
			</view>
		</view>
	</view>
</template>

<script>
import UserinfoItem from '@/components/UserinfoItem.vue'

export default {
	data() {
		return {
			containerHeight: 0,
			userInfo: {},
		}
	},
	components: {
		UserinfoItem
	},
	computed: {
		maskedPhone() {
			const phone = this.userInfo.phone;
			if (!phone || phone.length !== 11) return phone; // 简单校验手机号长度
			// 替换中间四位为****
			return phone.substr(0, 3) + '****' + phone.substr(7);
		}
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;

		uni.getStorage({
			key: 'userInfo',
			success: (res) => {
				if (res.data.status === 200) {
					this.userInfo = res.data.message;
					console.log(this.userInfo)
				}
			},
			fail: function () {
				console.log('没有找到用户信息');
			}
		});
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
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}
</style>
