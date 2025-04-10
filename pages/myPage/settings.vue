<template>
	<view class="settings" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="titleWrap">
				<text class="title">账号信息</text>
			</view>

			<view class="wrap">
				<view class="options">
					<Item text="邮箱" type="text" :fuc="goToPhoneNumber" :content="emailValue" />
				</view>

				<view class="options">
					<Item text="重置密码" :fuc="goToResetPwd" />
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

export default {
	name: "Settings",
	components: {
		Item,
		ConfirmPopup,
	},
	data() {
		return {
			containerHeight: 0,
			emailValue: "2392228720@qq.com",
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
	},
	methods: {
		openPopup() {
			console.log(this.$refs.popup.open)
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		handleLogout() {
			uni.showToast({
				title: "注销成功",
				icon: "success"
			});
			console.log(1)
			this.close();
		},
		a() {
			alert("跳转至修改手机页面");
		},
		goToResetPwd() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/ResetPwd'
			});
		},
		goToPhoneNumber() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/phoneNumber'
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