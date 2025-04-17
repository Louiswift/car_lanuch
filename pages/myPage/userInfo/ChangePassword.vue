<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<form @submit.prevent="handleSubmit" action="#" method="GET">
				<view class="form">
					<view class="itemWrap">
						<Input title="用户名" :txt="userInfo.username || ''" type="User" disabled />
						<Input title="旧密码" txt="请填写旧密码" type="password" v-model="oldPassword" />
						<Input title="新密码" txt="请输入新的密码" type="password" v-model="newPassword" />
						<Input title="确认密码" txt="请再次输入新的密码" type="password" v-model="confirmPassword" />
					</view>
					<view class="hint">
						密码必须是8-16位英文字母、数字、字符组合(不能是纯数字)
					</view>
					<view class="btnWrap">
						<button type="submit" @click="handleSubmit"
							:style="{ background: isButtonEnabled ? '#5677FC' : '#E1E1E1', color: isButtonEnabled ? '#FFFFFF' : '#BFBFBF' }"
							:disabled="!isButtonEnabled">完成</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import Input from '@/components/Input.vue'
import { updatepwd } from '@/pages/utils/api.js'

export default {
	data() {
		return {
			containerHeight: 0,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			userInfo: {}
		}
	},
	components: {
		Input
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
	computed: {
		isButtonEnabled() {
			return this.oldPassword.trim() !== '' && this.newPassword.trim() !== '' && this.confirmPassword.trim() !== '';
		}
	},
	methods: {
		async handleSubmit() {
			console.log("旧密码:", this.oldPassword);
			console.log("新密码:", this.newPassword);
			console.log("确认密码:", this.confirmPassword);

			if (this.newPassword !== this.confirmPassword) {
				uni.showToast({
					title: '新密码与确认密码不一致，请重新输入',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			if (this.oldPassword == this.newPassword) {
				uni.showToast({
					title: '请检查您的新密码与旧密码是否相同',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			const res = await updatepwd(this.userInfo.id, this.oldPassword, this.newPassword);
			if (res.status !== 200) {
				uni.showToast({
					title: '旧密码错误，请重新输入',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			uni.showToast({
				title: '密码修改成功',
				icon: 'success',
				duration: 2000
			});
			setTimeout(() => {
				uni.reLaunch({ url: "/" });
			}, 1000);
		}
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
	gap: 8px;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.itemWrap {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.item {
	display: flex;
	border-top: 1px solid #D8D8D8;
	padding: 12px 0;
}

.item input {
	font-size: 14px;
}

.hint {
	color: #A7A7A7;
	font-size: 14px;
}

.itemWrap .item:last-child {
	border-bottom: 1px solid #D8D8D8 !important;
}

span {
	width: 180rpx;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.btnWrap button {
	width: 70%;
	font-size: 24rpx;
	padding: 7px 20px;
	border-radius: 5px;
}
</style>
