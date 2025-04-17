<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="title">修改密码</view>

			<view class="step">
				<text :class="{ active: step === 1 }">1 验证邮箱 </text>
				<text>➡</text>
				<text :class="{ active: step === 2 }">2 重置密码</text>
			</view>

			<view class="step1" v-if="step === 1">
				<view class="desc">为了保证您的账号安全，请验证邮箱。验证成功后进行下一步操作</view>
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
				<button class="next-btn" :disabled="!code" @click="nextStep">下一步</button>
			</view>

			<view class="step2" v-if="step === 2">
				<view style="margin-top:25px;">
					<Input title="密码" txt="请输入密码" type="password" placeholder="请输入密码" v-model="password" maxlength="16"
						minlength="8" style="width:100%;" />
				</view>
				<view class="tips">密码长度为 8~16 位，必须包含大小写字母、数字和特殊字符</view>
				<button class="next-btn" :disabled="!isValidPassword" @click="submitPassword">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
import { startreset, doreset, sendresetcode } from '@/pages/utils/api.js'
import Input from '@/components/Input.vue'

export default {
	data() {
		return {
			step: 1,
			code: "",
			password: "",
			countdown: 0,
			timer: null,
			containerHeight: 0,
			email: "",
			second: 60,
			isFocus: false,
			showPassword: false,
			showText: true,
		};
	},
	computed: {
		isValidPassword() {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(this.password);
		},
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	components: {
		Input
	},
	methods: {
		togglePassword() {
			this.showPassword = !this.showPassword;
		},
		async nextStep() {
			if (!this.code) {
				uni.showToast({ title: "请输入验证码", icon: "none" });
				return;
			} else {
				const res = await startreset(this.email, this.code);
				console.log(res)
				if (res.status === 200) {
					uni.showToast({ title: "验证成功", icon: "success" });
					this.step = 2; // 进入重置密码步骤
					return
				} else {
					uni.showToast({ title: "验证码错误", icon: "none" });
					return;
				}
			}
		},
		async submitPassword() {
			if (!this.isValidPassword) {
				uni.showToast({ title: "密码格式不正确", icon: "none" });
				return;
			}

			const res = await doreset(this.password);
			if (res.status === 200) {
				uni.showToast({ title: "密码修改成功", icon: "success" });
				setTimeout(() => {
					uni.reLaunch({ url: "/" });
				}, 1000);
			} else {
				uni.showToast({ title: "密码修改失败", icon: "none" });
				return;
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

			try {
				const sendCoderes = await sendresetcode(this.email);
				if (sendCoderes.status === 200) {
					uni.showToast({
						title: sendCoderes.message,
						icon: 'none'
					});
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
					return;
				}
				console.log(sendCoderes)
			} catch (err) {
				console.error('发送失败', err);
			}
		},
	},
	beforeDestroy() {
		if (this.timer) clearInterval(this.timer);
	},
};
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

.title {
	font-size: 36rpx;
	font-weight: bold;
}

.phone-box {
	display: flex;
	align-items: center;
	gap: 5px;
}

.step {
	display: flex;
	align-items: center;
}

.step1 {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.step2 {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.step text {
	color: #666;
	font-size: 28rpx;
}

.step .active {
	color: #007aff;
	font-weight: bold;
}

.desc {
	font-size: 28rpx;
	color: #999;
}

.input-box {
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	background: #f5f5f5;
	padding: 20rpx;
	border-radius: 10rpx;
	margin-top: 20px;
}

.input {
	font-size: 14px;
}

.tips {
	color: #aaa;
	font-size: 24rpx;
}

.next-btn {
	width: 100%;
	background: #007aff;
	color: white;
	padding: 20rpx;
	font-size: 24rpx;
	border-radius: 10rpx;
}

.code-btn {
	font-size: 14px;
	width: fit-content;
	margin: 0;
}

.inputcode {
	flex: 1;
}

.next-btn:disabled {
	background: #444;
	color: #777;
}

img {
	width: 30px;
}

.input-wrapper {
	display: flex;
	align-items: center;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
	padding: 20rpx;
	transition: border-color 0.3s;
}

span {
	width: 180rpx;
	font-size: 28rpx;
}

.input-box1 {
	display: flex;
	align-items: center;
	background: #f5f5f5;
	border-radius: 10rpx;
	flex: 1;
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

.active {
	border-color: #007aff;
}

input {
	flex: 1;
	font-size: 28rpx;
}
</style>