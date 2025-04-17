<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<form @submit.prevent="handleSubmit" action="#" method="GET">
				<view class="form">
					<view class="itemWrap">
						<Input title="用户名" txt="请输入用户名" type="text" v-model="username" />
						<Input title="密码" txt="请输入密码" type="password" v-model="password" />
						<Input title="确认密码" txt="请再次输入密码" type="password" v-model="confirmPassword" />
						<Input title="手机号" txt="请输入手机号" type="number" v-model="phone" maxlength="11" />
						<Input title="邮箱" txt="请输入邮箱" type="text" v-model="email" maxlength="17" />

						<view class="focus-input">
							<view class="input-wrapper" :class="{ active: isFocus }">
								<span>验证码</span>
								<view class="input-box1">
									<input class="inputcode" type="text" placeholder="请输入验证码" maxlength="6"
										@focus="isFocus = true" @blur="isFocus = false" v-model="code">
									<view v-if="showText" class="t-c" @tap="sendCode()">发送验证码</view>
									<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="hint">
					密码必须是8-16位英文字母、数字、字符组合(不能是纯数字)
				</view>
				<view class="btnWrap">
					<button type="submit" @click="handleRegister"
						:style="{ background: isButtonEnabled ? '#5677FC' : '#E1E1E1', color: isButtonEnabled ? '#FFFFFF' : '#BFBFBF' }"
						:disabled="!isButtonEnabled">完成</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import Input from '@/components/Input.vue'
import {
	register,
	sendValidationCode
} from '@/pages/utils/api.js'

export default {

	data() {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			code: '',
			phone: '',
			containerHeight: 0,
			second: 60,
			isFocus: false,
			countdown: 0,
			showText: true,
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
			return this.username.trim() !== '' && this.password.trim() !== '' && this.confirmPassword.trim() !== '' &&
				this.email.trim() !== '' && this.code.trim() !== '' && this.phone.trim() !== '';
		}
	},
	methods: {
		async handleRegister() {
			var that = this;
			if (that.password !== that.confirmPassword) {
				uni.showToast({
					title: '新密码与确认密码不一致，请重新输入',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			if (!/^1[3-9]\d{9}$/.test(that.phone)) {
				uni.showToast({
					title: '请输入正确手机号',
					icon: 'none'
				});
				return;
			}

			if (!/^[1-9][0-9]{4,10}@qq\.com$/.test(that.email)) {
				uni.showToast({
					title: '请输入正确邮箱',
					icon: 'none'
				});
				return;
			}
			const res = await register(this.username, this.password, this.email, this.phone, this.code);
			// 根据接口返回结构处理
			if (res.status === 200) {
				uni.showToast({
					title: res.message,
					icon: "success"
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '/'
					})
				}, 1000);
			} else {
				uni.showToast({
					title: res.data.message || '注册失败',
					icon: 'none'
				});
			}
		},
		async sendCode() {
			if (!this.email) {
				uni.showToast({
					title: '请输入邮箱',
					icon: 'none'
				});
				return;
			}

			if (!/^[1-9][0-9]{4,10}@qq\.com$/.test(this.email)) {
				uni.showToast({
					title: '请输入正确邮箱',
					icon: 'none'
				});
				return;
			}

			try {
				const emailcoderes = await sendValidationCode(this.email);
				if (emailcoderes.status !== 200) {
					uni.showToast({
						title: emailcoderes.message,
						icon: 'none'
					});
					return;
				}
				console.log(emailcoderes)
				var that = this;
				var interval = setInterval(() => {
					that.showText = false;
					var times = that.second - 1;
					that.second = times;
				}, 1000);
				setTimeout(() => {
					clearInterval(interval);
					that.second = 60;
					that.showText = true;
				}, 60000);
			} catch (err) {
				console.error('发送失败', err);
			}
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

.wrap {
	display: flex;
	flex-direction: column;
	gap: 10px;
	backdrop-filter: #fff;
	border-radius: 10px;
	padding: 10px;
}

.item {
	display: flex;
	border-top: 1px solid #D8D8D8;
	padding: 12px 0;
}

.hint {
	color: #A7A7A7;
	font-size: 14px;
	margin-top: 10px;
}

.itemWrap {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.itemWrap .item:last-child {
	border-bottom: 1px solid #D8D8D8 !important;
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

.input-wrapper {
	display: flex;
	align-items: center;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
	padding: 20rpx;
	transition: border-color 0.3s;
}

.active {
	border-color: #007aff;
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
	font-size: 28rpx;
}

.input-box {
	display: flex;
	align-items: center;
	background: #f5f5f5;
	padding: 12px 0;
	border-top: 1px solid #D8D8D8;
	border-bottom: 1px solid #D8D8D8;
}

.input-box1 {
	display: flex;
	align-items: center;
	background: #f5f5f5;
	border-radius: 10rpx;
	flex: 1;
}

.inputcode {
	flex: 1;
}

.code-btn {
	font-size: 14px;
}

.input-wrapper {
	display: flex;
	align-items: center;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
	padding: 20rpx;
	transition: border-color 0.3s;
}

.input-wrapper.active {
	border-color: #007aff;
}

input {
	flex: 1;
	font-size: 28rpx;
	border: none;
	background: transparent;
}

.t-c {
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}
</style>