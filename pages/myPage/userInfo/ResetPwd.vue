<template>
	<view class="settings" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<view class="title">修改密码</view>

			<view class="step">
				<text :class="{ active: step === 1 }">1 验证手机</text>
				<text>➡</text>
				<text :class="{ active: step === 2 }">2 重置密码</text>
			</view>

			<view class="step1" v-if="step === 1">
				<view class="desc">为了保证您的账号安全，请验证手机。验证成功后进行下一步操作</view>
				<view class="phone-box">
					<img src="@/static/手机.png" alt="">
					<text class="phone">+86 {{maskedPhoneNumber }}</text>
				</view>
				<view class="input-box">
					<input type="number" v-model="code" placeholder="请输入验证码" maxlength="6" class="input" />
					<button class="code-btn" :disabled="countdown > 0" @click="getCode">
						{{ countdown > 0 ? `${countdown}s` : "获取验证码" }}
					</button>
				</view>
				<button class="next-btn" :disabled="!code" @click="nextStep">下一步</button>
			</view>

			<view class="step2" v-if="step === 2">
				<view class="input-box">
					<input type="password" v-model="password" placeholder="请输入密码" maxlength="16" class="input" />
					<u-icon name="eye" size="20" color="#ccc"></u-icon>
				</view>
				<view class="tips">密码长度为 8~16 位，必须包含大小写字母、数字和特殊字符</view>
				<button class="next-btn" :disabled="!isValidPassword" @click="submitPassword">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			step: 1, // 当前步骤
			code: "",
			password: "",
			countdown: 0,
			timer: null,
			containerHeight: 0,
			phoneNumber: "18347156218"
		};
	},
	computed: {
		maskedPhoneNumber() {
			return this.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		},
		isValidPassword() {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(this.password);
		},
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	methods: {
		getCode() {
			if (this.countdown > 0) return;
			uni.showToast({ title: "验证码已发送", icon: "success" });
			this.countdown = 60;
			this.timer = setInterval(() => {
				this.countdown--;
				if (this.countdown <= 0) clearInterval(this.timer);
			}, 1000);
		},
		nextStep() {
			if (!this.code) {
				uni.showToast({ title: "请输入验证码", icon: "none" });
				return;
			}
			this.step = 2; // 进入重置密码步骤
		},
		submitPassword() {
			if (!this.isValidPassword) {
				uni.showToast({ title: "密码格式不正确", icon: "none" });
				return;
			}
			uni.showToast({ title: "密码修改成功", icon: "success" });
			setTimeout(() => {
				uni.reLaunch({ url: "/" });
			}, 1000);
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

.phone-box{
	display: flex;
	align-items: center;
	gap: 5px;
}

.step {
	display: flex;
	align-items: center;
}

.step1{
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.step2{
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
	background: #f5f5f5;
	padding: 20rpx;
	border-radius: 10rpx;
	margin-top: 20px;
}

.input {
	flex: 1;
	background: transparent;
	border: none;
	font-size: 30rpx;
	outline: none;
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

.code-btn{
	font-size: 14px;
}

.next-btn:disabled {
	background: #444;
	color: #777;
}

img{
	 width: 30px;
}
</style>