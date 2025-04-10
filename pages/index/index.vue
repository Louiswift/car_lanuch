<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">欢迎使用，慧穹智慧小程序</view>
		<form class="cl">
			<view class="auth-wrap">
				<view class="input-wrap">
					<view class="t-a">
						<image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
						<input type="text" name="email" placeholder="请输入邮箱" maxlength="17" v-model="email" />
					</view>
					<view class="t-a" v-if="!isPasswordMode">
						<image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
						<input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="code" />
						<view v-if="showText" class="t-c" @tap="sendCode()">发送短信</view>
						<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view>
					</view>

					<view class="t-a" v-if="isPasswordMode">
						<image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
						<input type="number" name="password" maxlength="16" placeholder="请输入密码" v-model="password" />
					</view>
				</view>

				<view class="auth-box">
					<view @click="goToRegister">立即注册</view>
					<view class="toggle-btn" @click="isPasswordModeFuc">
						{{ isPasswordMode ? "验证码" : "密码" }}
					</view>
					<view @click="goToResetPwd">忘记密码</view>
				</view>
				<button type="submit" class="login" @click="handleLogin">登 录</button>
			</view>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()">
				<image src="https://zhoukaiwen.com/img/loginImg/wx.png"></image>
			</view>
			<view class="t-g" @tap="zfbLogin()">
				<image src="https://zhoukaiwen.com/img/loginImg/qq.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
import { sendValidationCode, login } from '@/pages/utils/api.js'

export default {
	data() {
		return {
			title: '欢迎回来！',
			second: 60,
			showText: true,
			email: '2392228720@qq.com',
			code: '',
			password: '',
			isPasswordMode: false, // false=验证码输入，true=密码输入
			showPassword: false, // 密码可见状态
		};
	},
	onLoad() { },
	methods: {
		toggleInputType(type) {
			this.isPassword = (type === 'password');
			this.inputValue = ''; // 清空输入框
		},
		goToResetPwd() {
			uni.navigateTo({
				url: '/pages/myPage/userInfo/ResetPwd'
			});
		},
		goToRegister() {
			uni.navigateTo({
				url: '/pages/register'
			});
		},
		isPasswordModeFuc() {
			if (this.isPasswordMode) {
				this.isPasswordMode = false;
				this.password = '';
			} else {
				this.isPasswordMode = true;
				this.code = '';
			}
			console.log(this.isPasswordMode)
		}
		,
		async handleLogin() {
			var that = this;
			if (!that.email) {
				uni.showToast({
					title: '请输入邮箱',
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
			if (!that.code && !this.isPasswordMode) {
				alert("请输入验证码")
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			if (!that.password && this.isPasswordMode) {
				alert("请输入密码")
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}

			uni.switchTab({
				url: '../home'
			});

			try {
				let second = this.password || this.code;
				const res = await login(this.email, second)
				console.log(this.email)
				console.log(res)

				if (res.status === 200) {
					console.log('登录信息：', res)
					// 保存登录信息，比如 token / cookie / 用户信息
					uni.showToast({
						title: '登录成功！',
						icon: 'none'
					});
					// uni.switchTab({
					// 	url: '../home'
					// });
				} else {
					uni.showToast({
						title: res.msg || '登录失败',
						icon: 'none'
					})
				}
			} catch (err) {
				console.error('登录异常：', err)
				uni.showToast({
					title: '网络错误',
					icon: 'none'
				})
			}
		},
		async sendCode() {
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

			if (!this.email) {
				uni.showToast({
					title: '请输入邮箱',
					icon: 'none'
				});
				return;
			}

			try {
				await sendValidationCode(this.email);
			} catch (err) {
				console.error('发送失败', err);
			}
		},
		wxLogin() {
			uni.showToast({
				title: '微信登录',
				icon: 'none'
			});
		},
		zfbLogin() {
			uni.showToast({
				title: 'qq登录',
				icon: 'none'
			});
		}
	}
};
</script>
<style>
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
}

.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -180rpx;
	/* margin-bottom: -200rpx; */
}

.auth-box {
	display: flex;
	justify-content: space-between;
	padding: 0 50rpx;
}

.input-wrap {
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.auth-wrap {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.login {
	width: 80%;
	margin-top: 30rpx;
}

.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	/* margin-bottom: 30rpx; */
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	/* border-right: 2rpx solid #dedede; */
	margin-right: 20rpx;
}

.t-login .t-a .line {
	width: 2rpx;
	height: 40rpx;
	background-color: #dedede;
	position: absolute;
	top: 28rpx;
	left: 98rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 230rpx 0 30rpx 0;
	font-weight: bold;
}

.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 120rpx 0;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>