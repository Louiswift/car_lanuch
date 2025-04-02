<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<form @submit.prevent="handleSubmit" action="#" method="GET">
				<view class="form">
					<view class="itemWrap">
						<Input title="用户名" txt="蜡笔小新" type="User" disabled />
						<Input title="旧密码" txt="请填写旧密码" type="other" v-model="oldPassword" />
						<Input title="新密码" txt="请输入新的密码" type="other" v-model="newPassword" />
						<Input title="确认密码" txt="请再次输入新的密码" type="other" v-model="confirmPassword" />
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

export default {
	data() {
		return {
			containerHeight: 0,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		}
	},
	components: {
		Input
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	computed: {
		isButtonEnabled() {
			return this.oldPassword.trim() !== '' && this.newPassword.trim() !== '' && this.confirmPassword.trim() !== '';
		}
	},
	methods: {
		handleSubmit() {
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
			console.log("密码修改成功");
			uni.showToast({
				title: '密码修改成功',
				icon: 'success',
				duration: 2000
			});
			uni.redirectTo({ url: '/' })
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

.btnWrap button{
	width: 70%;
	font-size: 24rpx;
	padding: 7px 20px;
	border-radius: 5px;
}
</style>
