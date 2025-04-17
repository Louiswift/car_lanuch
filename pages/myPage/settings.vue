<template>
	<view class="settings" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="titleWrap">
				<text class="title">账号信息</text>
			</view>

			<view class="wrap">
				<view class="options">
					<Item text="个人资料" :fuc="goToUserInfo" />
					<Item text="邮箱" type="text" :fuc="goToEmail" :content="userInfo.email" />
				</view>

				<view class="options">
					<Item text="修改密码" :fuc="goToChangePassword" />
				</view>

				<view class="options">
					<Item text="注销账号" :fuc="openPopup" />
					<ConfirmPopup ref="popup" @confirm="handleLogout" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Item from 'components/Item.vue';
import ConfirmPopup from "@/components/ConfirmPopup.vue";
import { LogoutAc } from '@/pages/utils/api.js'

export default {
	name: "Settings",
	components: {
		Item,
		ConfirmPopup,
	},
	data() {
		return {
			containerHeight: 0,
			userInfo: {},
		}
	},
	computed: {
		maskedPhoneNumber() {
			return this.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		},
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
		openPopup() {
			console.log(this.$refs.popup.open)
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		async handleLogout() {
			const res = await LogoutAc(this.userInfo.id)
			if (res.status === 200) {
				uni.showToast({
					title: "注销成功",
					icon: "success"
				});
				this.close();
				setTimeout(() => {
					uni.reLaunch({ url: "/" });
				}, 1000);
			} else {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				this.close();
			}
		},
		goToUserInfo() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/userInfo'
			});
		},
		a() {
			alert("跳转至修改手机页面");
		},
		goToEmail() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/email'
			});
		},
		goToChangePassword() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/ChangePassword'
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
};
</script>

<style scoped>
.settings {
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.titleWrap {
	padding-left: 5px;
}

.wrap {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.title {
	font-size: 14px;
	color: #7E7D83;
}

.options {
	background-color: #fff;
	border-radius: 8px;
	overflow: hidden;
}

.popup-buttons {
	display: flex;
	justify-content: space-between;
	padding: 10px;
}
</style>