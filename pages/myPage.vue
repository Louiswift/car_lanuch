<template>
	<view class="my-page" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
				<view class="user-details">
					<text class="username">{{ userInfo.username }}</text>
					<!-- <text class="user-email">{{ userInfo.email }}</text> -->
				</view>
			</view>

			<view class="wrap">
				<view class="options">
					<Item text="账号与安全" :fuc="goToSettings" />
					<Item text="设置" :fuc="goToSet" />
					<Item text="关于我们" :fuc="goToAbout" />
				</view>

				<view class="logout" @click="logout">
					<text>退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Item from '@/components/Item.vue';
export default {
	onTabItemTap(item) {
		uni.$emit("tabChanged", item);
	},
	name: "MyPage",
	components: {
		Item 
	},
	data() {
		return {
			containerHeight: 0,
			userInfo: {
				avatarUrl: 'data:image/jpeg;base64,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', // 用户头像URL
				username: '蜡笔小新',
				// email: 'user@example.com'
			}
		};
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	methods: {
		logout() {
			uni.showToast({ title: "已退出登录", icon: "success" });
			setTimeout(() => {
				uni.reLaunch({ url: "/" });
			}, 1000);
		},
		goToSet() {
			uni.navigateTo({
				url: '/pages/myPage/set'
			});
		},
		goToSettings() {
			uni.navigateTo({
				url: '/pages/myPage/settings'
			});
		},
		goToAbout() {
			uni.navigateTo({
				url: '/pages/myPage/about'
			});
		},

	}
}


</script>

<style scoped>
.my-page {
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

.rightIcon {
	width: 20px;
}

.user-info {
	display: flex;
	align-items: center;
}

.avatar {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 15px;
}

.user-details {
	flex: 1;
}

.username {
	font-size: 18px;
	font-weight: bold;
}

.user-email {
	font-size: 14px;
	color: #888;
}

.wrap {
	display: flex;
	flex-direction: column;
	gap: 15px;
	/* box-shadow: 5px 10px 15px #88888877; */
	border-radius: 10px;
}

.options {
	background-color: #fff;
	border-radius: 8px;
	overflow: hidden;
}

.logout {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15px;
	text-align: center;
	color: red;
	border-radius: 30px;
	letter-spacing: 3px;
	font-weight: 600;
	/* box-shadow: 5px 10px 15px #88888877; */
	background-color: #fff;
}


</style>