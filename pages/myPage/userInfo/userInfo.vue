<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="wrap">
				<view class="options">
					<UserinfoItem title="头像" type="avctor" />
					<UserinfoItem title="昵称" type="value" :content="userInfo.username" />
					<UserinfoItem title="邮箱" type="value" :content="maskedEmail" />
					<UserinfoItem title="手机号" type="value" :content="maskedPhone" class="phonestyle" />
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
		},

		maskedEmail() {
			const email = this.userInfo.email;
			// 用正则匹配邮箱中的数字部分
			// 这里假设只替换第一个连续数字串的中间四位
			return email.replace(/(\d{2})\d{4}(\d+)/, (match, p1, p2) => {
				return p1 + '****' + p2;
			});
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

.phonestyle {
	letter-spacing: 2px;
}
</style>
